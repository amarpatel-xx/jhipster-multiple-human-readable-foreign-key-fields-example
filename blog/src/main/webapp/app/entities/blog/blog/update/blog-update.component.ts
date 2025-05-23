import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITajUser } from 'app/entities/blog/taj-user/taj-user.model';
import { TajUserService } from 'app/entities/blog/taj-user/service/taj-user.service';
import { IBlog } from '../blog.model';
import { BlogService } from '../service/blog.service';
import { BlogFormGroup, BlogFormService } from './blog-form.service';

@Component({
  selector: 'jhi-blog-update',
  templateUrl: './blog-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BlogUpdateComponent implements OnInit {
  isSaving = false;
  blog: IBlog | null = null;

  tajUsersSharedCollection: ITajUser[] = [];

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
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const blog = this.blogFormService.getBlog(this.editForm);
    if (blog.id !== null) {
      this.subscribeToSaveResponse(this.blogService.update(blog));
    } else {
      this.subscribeToSaveResponse(this.blogService.create(blog));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlog>>): void {
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

  protected updateForm(blog: IBlog): void {
    this.blog = blog;
    this.blogFormService.resetForm(this.editForm, blog);

    this.tajUsersSharedCollection = this.tajUserService.addTajUserToCollectionIfMissing<ITajUser>(
      this.tajUsersSharedCollection,
      blog.tajUser,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tajUserService
      .query()
      .pipe(map((res: HttpResponse<ITajUser[]>) => res.body ?? []))
      .pipe(map((tajUsers: ITajUser[]) => this.tajUserService.addTajUserToCollectionIfMissing<ITajUser>(tajUsers, this.blog?.tajUser)))
      .subscribe((tajUsers: ITajUser[]) => (this.tajUsersSharedCollection = tajUsers));
  }
}
