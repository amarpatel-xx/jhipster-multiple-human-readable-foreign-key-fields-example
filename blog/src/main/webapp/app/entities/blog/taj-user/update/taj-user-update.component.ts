import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITajUser } from '../taj-user.model';
import { TajUserService } from '../service/taj-user.service';
import { TajUserFormService, TajUserFormGroup } from './taj-user-form.service';

@Component({
  standalone: true,
  selector: 'jhi-taj-user-update',
  templateUrl: './taj-user-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TajUserUpdateComponent implements OnInit {
  isSaving = false;
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
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tajUser = this.tajUserFormService.getTajUser(this.editForm);
    if (tajUser.id !== null) {
      this.subscribeToSaveResponse(this.tajUserService.update(tajUser));
    } else {
      this.subscribeToSaveResponse(this.tajUserService.create(tajUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITajUser>>): void {
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
    this.isSaving = false;
  }

  protected updateForm(tajUser: ITajUser): void {
    this.tajUser = tajUser;
    this.tajUserFormService.resetForm(this.editForm, tajUser);
  }
}
