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
import { IPost } from 'app/entities/psqlblog/post/post.model';
import { PostService } from 'app/entities/psqlblog/post/service/post.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { AlertErrorModel } from 'app/shared/alert/alert-error.model';
import { TranslateDirective } from 'app/shared/language';
import { TagService } from '../service/tag.service';
import { ITag } from '../tag.model';

import { TagFormGroup, TagFormService } from './tag-form.service';

@Component({
  selector: 'jhi-tag-update',
  templateUrl: './tag-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TagUpdate implements OnInit {
  readonly isSaving = signal(false);
  tag: ITag | null = null;

  postsSharedCollection = signal<IPost[]>([]);

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected tagService = inject(TagService);
  protected tagFormService = inject(TagFormService);
  protected postService = inject(PostService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TagFormGroup = this.tagFormService.createTagFormGroup();

  comparePost = (o1: IPost | null, o2: IPost | null): boolean => this.postService.comparePost(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => {
      this.tag = tag;
      if (tag) {
        this.updateForm(tag);
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
        this.eventManager.broadcast(new EventWithContent<AlertErrorModel>('psqlblogApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const tag = this.tagFormService.getTag(this.editForm);
    if (tag.id === null) {
      this.subscribeToSaveResponse(this.tagService.create(tag));
    } else {
      this.subscribeToSaveResponse(this.tagService.update(tag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITag | null>): void {
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

  protected updateForm(tag: ITag): void {
    this.tag = tag;
    this.tagFormService.resetForm(this.editForm, tag);

    this.postsSharedCollection.update(posts => this.postService.addPostToCollectionIfMissing<IPost>(posts, ...(tag.posts ?? [])));
  }

  protected loadRelationshipsOptions(): void {
    this.postService
      .query()
      .pipe(map((res: HttpResponse<IPost[]>) => res.body ?? []))
      .pipe(map((posts: IPost[]) => this.postService.addPostToCollectionIfMissing<IPost>(posts, ...(this.tag?.posts ?? []))))
      .subscribe((posts: IPost[]) => this.postsSharedCollection.set(posts));
  }
}
