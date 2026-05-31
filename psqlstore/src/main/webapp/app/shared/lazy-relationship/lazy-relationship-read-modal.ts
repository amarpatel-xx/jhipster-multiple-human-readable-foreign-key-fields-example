import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbActiveModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Generic read-only popup that lazy-loads a single excluded relationship of
 * a parent entity (one of the fields listed in entityGraphExcludeCustomAnnotation).
 *
 * Caller workflow (typical):
 *   const modal = this.modalService.open(LazyRelationshipReadModalComponent, { size: 'lg', backdrop: 'static' });
 *   modal.componentInstance.parentApiUrl = '/api/taj-organizations';
 *   modal.componentInstance.parentId = this.entity.id;
 *   modal.componentInstance.fieldName = 'customers';
 *   modal.componentInstance.fieldDisplayName = 'Customers';
 *   modal.componentInstance.displayLabelField = 'name';   // or null to fall back to id
 */
@Component({
  selector: 'jhi-lazy-relationship-read-modal',
  standalone: true,
  templateUrl: './lazy-relationship-read-modal.html',
  imports: [CommonModule, FormsModule, NgbPagination, TranslateModule],
})
export class LazyRelationshipReadModalComponent implements OnInit {
  // Inputs set by caller via componentInstance after modalService.open(...).
  parentApiUrl = '';
  parentId: string | number = '';
  fieldName = '';
  fieldDisplayName = '';
  // displayLabelField: a single field on the peer (legacy DISPLAY_IN_GUI_RELATIONSHIP_LINK marker).
  // displayLabelPath: a space-separated set of dot-paths through a relationship on the peer
  //   (e.g. "person.firstName person.lastName"); takes priority over displayLabelField.
  // If neither is set, renderer falls back to the peer's id.
  displayLabelField: string | null = null;
  displayLabelPath: string | null = null;

  protected readonly activeModal = inject(NgbActiveModal);
  private readonly http = inject(HttpClient);

  readonly items = signal<Array<Record<string, unknown>>>([]);
  readonly totalItems = signal<number>(0);
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(20);
  readonly searchTerm = signal<string>('');
  readonly loading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    let params = new HttpParams()
      .set('page', String(this.page() - 1)) // ngb-pagination is 1-based, Spring Pageable is 0-based
      .set('size', String(this.pageSize()));
    const term = this.searchTerm().trim();
    if (term) {
      params = params.set('search', term);
    }
    const url = `${this.parentApiUrl}/${encodeURIComponent(String(this.parentId))}/${this.fieldName}`;
    this.http.get<Array<Record<string, unknown>>>(url, { params, observe: 'response' }).subscribe({
      next: response => {
        this.items.set(response.body ?? []);
        const totalHeader = response.headers.get('X-Total-Count');
        this.totalItems.set(totalHeader ? parseInt(totalHeader, 10) || 0 : (response.body?.length ?? 0));
        this.loading.set(false);
      },
      error: err => {
        this.errorMessage.set(err?.message ?? 'Failed to load');
        this.loading.set(false);
      },
    });
  }

  onPageChange(newPage: number): void {
    if (newPage === this.page()) return;
    this.page.set(newPage);
    this.load();
  }

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.page.set(1);
    this.load();
  }

  getDisplayLabel(item: Record<string, unknown>): string {
    // Path takes priority — composes the label from one or more relationship paths
    // (e.g. "person.firstName person.lastName") and joins the results with spaces.
    if (this.displayLabelPath) {
      const paths = this.displayLabelPath.trim().split(/\s+/).filter(Boolean);
      const values = paths
        .map(p => this.walkPath(item, p))
        .filter(v => v != null && v !== '')
        .map(v => String(v));
      if (values.length) return values.join(' ');
    }
    if (this.displayLabelField && item[this.displayLabelField] != null) {
      return String(item[this.displayLabelField]);
    }
    const id = item.id;
    return id != null ? String(id) : '';
  }

  private walkPath(obj: Record<string, unknown>, path: string): unknown {
    let cur: unknown = obj;
    for (const part of path.split('.')) {
      if (cur == null || typeof cur !== 'object') return null;
      cur = (cur as Record<string, unknown>)[part];
    }
    return cur;
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
