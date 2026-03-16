import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IBlog } from 'app/entities/psqlblog/blog/blog.model';
import { BlogService } from 'app/entities/psqlblog/blog/service/blog.service';
import { TagService } from 'app/entities/psqlblog/tag/service/tag.service';
import { ITag } from 'app/entities/psqlblog/tag/tag.model';
import { IPost } from '../post.model';
import { PostService } from '../service/post.service';

import { PostFormService } from './post-form.service';
import { PostUpdate } from './post-update';

describe('Post Management Update Component', () => {
  let comp: PostUpdate;
  let fixture: ComponentFixture<PostUpdate>;
  let activatedRoute: ActivatedRoute;
  let postFormService: PostFormService;
  let postService: PostService;
  let blogService: BlogService;
  let tagService: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(PostUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    postFormService = TestBed.inject(PostFormService);
    postService = TestBed.inject(PostService);
    blogService = TestBed.inject(BlogService);
    tagService = TestBed.inject(TagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Blog query and add missing value', () => {
      const post: IPost = { id: 'b0ed8852-431a-45ab-8c51-ab3b9a46e59d' };
      const blog: IBlog = { id: 'd97e55e3-ad93-4a91-b761-e2d09b7c888e' };
      post.blog = blog;

      const blogCollection: IBlog[] = [{ id: 'd97e55e3-ad93-4a91-b761-e2d09b7c888e' }];
      vitest.spyOn(blogService, 'query').mockReturnValue(of(new HttpResponse({ body: blogCollection })));
      const additionalBlogs = [blog];
      const expectedCollection: IBlog[] = [...additionalBlogs, ...blogCollection];
      vitest.spyOn(blogService, 'addBlogToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ post });
      comp.ngOnInit();

      expect(blogService.query).toHaveBeenCalled();
      expect(blogService.addBlogToCollectionIfMissing).toHaveBeenCalledWith(
        blogCollection,
        ...additionalBlogs.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.blogsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Tag query and add missing value', () => {
      const post: IPost = { id: 'b0ed8852-431a-45ab-8c51-ab3b9a46e59d' };
      const tags: ITag[] = [{ id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' }];
      post.tags = tags;

      const tagCollection: ITag[] = [{ id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' }];
      vitest.spyOn(tagService, 'query').mockReturnValue(of(new HttpResponse({ body: tagCollection })));
      const additionalTags = [...tags];
      const expectedCollection: ITag[] = [...additionalTags, ...tagCollection];
      vitest.spyOn(tagService, 'addTagToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ post });
      comp.ngOnInit();

      expect(tagService.query).toHaveBeenCalled();
      expect(tagService.addTagToCollectionIfMissing).toHaveBeenCalledWith(
        tagCollection,
        ...additionalTags.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.tagsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const post: IPost = { id: 'b0ed8852-431a-45ab-8c51-ab3b9a46e59d' };
      const blog: IBlog = { id: 'd97e55e3-ad93-4a91-b761-e2d09b7c888e' };
      post.blog = blog;
      const tag: ITag = { id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' };
      post.tags = [tag];

      activatedRoute.data = of({ post });
      comp.ngOnInit();

      expect(comp.blogsSharedCollection()).toContainEqual(blog);
      expect(comp.tagsSharedCollection()).toContainEqual(tag);
      expect(comp.post).toEqual(post);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPost>();
      const post = { id: 'a160eb1a-708c-49ba-b8e5-91e7bc01ba3f' };
      vitest.spyOn(postFormService, 'getPost').mockReturnValue(post);
      vitest.spyOn(postService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ post });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(post);
      saveSubject.complete();

      // THEN
      expect(postFormService.getPost).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(postService.update).toHaveBeenCalledWith(expect.objectContaining(post));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPost>();
      const post = { id: 'a160eb1a-708c-49ba-b8e5-91e7bc01ba3f' };
      vitest.spyOn(postFormService, 'getPost').mockReturnValue({ id: null });
      vitest.spyOn(postService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ post: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(post);
      saveSubject.complete();

      // THEN
      expect(postFormService.getPost).toHaveBeenCalled();
      expect(postService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IPost>();
      const post = { id: 'a160eb1a-708c-49ba-b8e5-91e7bc01ba3f' };
      vitest.spyOn(postService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ post });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(postService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBlog', () => {
      it('should forward to blogService', () => {
        const entity = { id: 'd97e55e3-ad93-4a91-b761-e2d09b7c888e' };
        const entity2 = { id: '0b7b7e1b-829e-42cc-b398-3eae2463fe73' };
        vitest.spyOn(blogService, 'compareBlog');
        comp.compareBlog(entity, entity2);
        expect(blogService.compareBlog).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTag', () => {
      it('should forward to tagService', () => {
        const entity = { id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' };
        const entity2 = { id: '5a0a2837-7a7b-4933-be56-a0b190ca7642' };
        vitest.spyOn(tagService, 'compareTag');
        comp.compareTag(entity, entity2);
        expect(tagService.compareTag).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
