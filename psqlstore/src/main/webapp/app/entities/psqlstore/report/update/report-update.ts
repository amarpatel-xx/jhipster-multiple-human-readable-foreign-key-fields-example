import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { IProduct } from 'app/entities/psqlstore/product/product.model';
import { ProductService } from 'app/entities/psqlstore/product/service/product.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { AlertErrorModel } from 'app/shared/alert/alert-error.model';
import { TranslateDirective } from 'app/shared/language';
import { IReport } from '../report.model';
import { ReportService } from '../service/report.service';

import { ReportFormGroup, ReportFormService } from './report-form.service';

@Component({
  selector: 'jhi-report-update',
  templateUrl: './report-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ReportUpdate implements OnInit {
  readonly isSaving = signal(false);
  report: IReport | null = null;

  productsSharedCollection = signal<IProduct[]>([]);

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected reportService = inject(ReportService);
  protected reportFormService = inject(ReportFormService);
  protected productService = inject(ProductService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ReportFormGroup = this.reportFormService.createReportFormGroup();

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ report }) => {
      this.report = report;
      if (report) {
        this.updateForm(report);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertErrorModel>('psqlstoreApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const report = this.reportFormService.getReport(this.editForm);
    if (report.id === null) {
      this.subscribeToSaveResponse(this.reportService.create(report));
    } else {
      this.subscribeToSaveResponse(this.reportService.update(report));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IReport | null>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving.set(false);
  }

  protected updateForm(report: IReport): void {
    this.report = report;
    this.reportFormService.resetForm(this.editForm, report);

    this.productsSharedCollection.update(products =>
      this.productService.addProductToCollectionIfMissing<IProduct>(products, report.product),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing<IProduct>(products, this.report?.product)))
      .subscribe((products: IProduct[]) => this.productsSharedCollection.set(products));
  }
}
