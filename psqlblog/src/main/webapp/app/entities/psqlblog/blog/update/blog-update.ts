import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TajUserService } from 'app/entities/psqlblog/taj-user/service/taj-user.service';
import { ITajUser } from 'app/entities/psqlblog/taj-user/taj-user.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IBlog } from '../blog.model';
import { BlogService } from '../service/blog.service';

import { BlogFormGroup, BlogFormService } from './blog-form.service';

@Component({
  selector: 'jhi-blog-update',
  templateUrl: './blog-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class BlogUpdate implements OnInit {
  readonly isSaving = signal(false);
  blog: IBlog | null = null;

  tajUsersSharedCollection = signal<ITajUser[]>([]);

  protected blogService = inject(BlogService);
  protected blogFormService = inject(BlogFormService);
  protected tajUserService = inject(TajUserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BlogFormGroup = this.blogFormService.createBlogFormGroup();

  compareTajUser = (o1: ITajUser | null, o2: ITajUser | null): boolean => this.tajUserService.compareTajUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ blog }) => {
      this.blog = blog;
      if (blog) {
        this.updateForm(blog);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const blog = this.blogFormService.getBlog(this.editForm);
    if (blog.id === null) {
      this.subscribeToSaveResponse(this.blogService.create(blog));
    } else {
      this.subscribeToSaveResponse(this.blogService.update(blog));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IBlog | null>): void {
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

  protected updateForm(blog: IBlog): void {
    this.blog = blog;
    this.blogFormService.resetForm(this.editForm, blog);

    this.tajUsersSharedCollection.update(tajUsers => this.tajUserService.addTajUserToCollectionIfMissing<ITajUser>(tajUsers, blog.tajUser));
  }

  protected loadRelationshipsOptions(): void {
    this.tajUserService
      .query()
      .pipe(map((res: HttpResponse<ITajUser[]>) => res.body ?? []))
      .pipe(map((tajUsers: ITajUser[]) => this.tajUserService.addTajUserToCollectionIfMissing<ITajUser>(tajUsers, this.blog?.tajUser)))
      .subscribe((tajUsers: ITajUser[]) => this.tajUsersSharedCollection.set(tajUsers));
  }
}
