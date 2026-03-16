import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { TajUserService } from '../service/taj-user.service';
import { ITajUser } from '../taj-user.model';

import { TajUserFormGroup, TajUserFormService } from './taj-user-form.service';

@Component({
  selector: 'jhi-taj-user-update',
  templateUrl: './taj-user-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TajUserUpdate implements OnInit {
  readonly isSaving = signal(false);
  tajUser: ITajUser | null = null;

  protected tajUserService = inject(TajUserService);
  protected tajUserFormService = inject(TajUserFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TajUserFormGroup = this.tajUserFormService.createTajUserFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tajUser }) => {
      this.tajUser = tajUser;
      if (tajUser) {
        this.updateForm(tajUser);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const tajUser = this.tajUserFormService.getTajUser(this.editForm);
    if (tajUser.id === null) {
      this.subscribeToSaveResponse(this.tajUserService.create(tajUser));
    } else {
      this.subscribeToSaveResponse(this.tajUserService.update(tajUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITajUser | null>): void {
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

  protected updateForm(tajUser: ITajUser): void {
    this.tajUser = tajUser;
    this.tajUserFormService.resetForm(this.editForm, tajUser);
  }
}
