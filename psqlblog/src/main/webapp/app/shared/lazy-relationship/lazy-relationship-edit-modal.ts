import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbActiveModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Generic edit popup for a single excluded relationship of a parent entity.
 *
 * The user picks which existing peer entities should be members of the
 * relationship (no new-peer creation here — peers are created via their
 * own admin pages). The selection set is preserved across pagination and
 * search so a Save commits the full picked set, not just the current page.
 *
 * Caller workflow:
 *   const modal = this.modalService.open(LazyRelationshipEditModalComponent, { size: 'lg', backdrop: 'static' });
 *   modal.componentInstance.parentApiUrl = '/api/taj-organizations';
 *   modal.componentInstance.parentId = this.entity.id;
 *   modal.componentInstance.fieldName = 'customers';
 *   modal.componentInstance.fieldDisplayName = 'Customers';
 *   modal.componentInstance.displayLabelField = 'name';
 *   modal.result.then(saved => { ... });  // 'saved' if Save clicked, dismissed otherwise
 */
@Component({
  selector: 'jhi-lazy-relationship-edit-modal',
  standalone: true,
  templateUrl: './lazy-relationship-edit-modal.html',
  imports: [CommonModule, FormsModule, NgbPagination, TranslateModule],
})
export class LazyRelationshipEditModalComponent implements OnInit {
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

  readonly candidates = signal<Array<Record<string, unknown>>>([]);
  readonly totalCandidates = signal<number>(0);
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(20);
  readonly searchTerm = signal<string>('');
  readonly loadingCandidates = signal<boolean>(false);
  readonly loadingIds = signal<boolean>(false);
  readonly saving = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Stringified ids so a UUID and a numeric primary key compare consistently.
  readonly selectedIds = signal<Set<string>>(new Set());

  ngOnInit(): void {
    this.loadIds();
    this.loadCandidates();
  }

  loadIds(): void {
    this.loadingIds.set(true);
    const url = `${this.parentApiUrl}/${encodeURIComponent(String(this.parentId))}/${this.fieldName}/ids`;
    this.http.get<Array<string | number>>(url).subscribe({
      next: ids => {
        this.selectedIds.set(new Set((ids ?? []).map(id => String(id))));
        this.loadingIds.set(false);
      },
      error: err => {
        this.errorMessage.set(err?.message ?? 'Failed to load current selection');
        this.loadingIds.set(false);
      },
    });
  }

  loadCandidates(): void {
    this.loadingCandidates.set(true);
    let params = new HttpParams().set('page', String(this.page() - 1)).set('size', String(this.pageSize()));
    const term = this.searchTerm().trim();
    if (term) params = params.set('search', term);
    const url = `${this.parentApiUrl}/${encodeURIComponent(String(this.parentId))}/${this.fieldName}/candidates`;
    this.http.get<Array<Record<string, unknown>>>(url, { params, observe: 'response' }).subscribe({
      next: response => {
        this.candidates.set(response.body ?? []);
        const totalHeader = response.headers.get('X-Total-Count');
        this.totalCandidates.set(totalHeader ? parseInt(totalHeader, 10) || 0 : (response.body?.length ?? 0));
        this.loadingCandidates.set(false);
      },
      error: err => {
        this.errorMessage.set(err?.message ?? 'Failed to load candidates');
        this.loadingCandidates.set(false);
      },
    });
  }

  onPageChange(newPage: number): void {
    if (newPage === this.page()) return;
    this.page.set(newPage);
    this.loadCandidates();
  }

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.page.set(1);
    this.loadCandidates();
  }

  isSelected(item: Record<string, unknown>): boolean {
    const id = item.id;
    return id != null && this.selectedIds().has(String(id));
  }

  toggle(item: Record<string, unknown>): void {
    const id = item.id;
    if (id == null) return;
    const next = new Set(this.selectedIds());
    const key = String(id);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this.selectedIds.set(next);
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

  save(): void {
    this.saving.set(true);
    this.errorMessage.set(null);
    const url = `${this.parentApiUrl}/${encodeURIComponent(String(this.parentId))}/${this.fieldName}`;
    const ids = Array.from(this.selectedIds());
    this.http.put<void>(url, ids).subscribe({
      next: () => {
        this.saving.set(false);
        this.activeModal.close('saved');
      },
      error: err => {
        this.errorMessage.set(err?.message ?? 'Save failed');
        this.saving.set(false);
      },
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
