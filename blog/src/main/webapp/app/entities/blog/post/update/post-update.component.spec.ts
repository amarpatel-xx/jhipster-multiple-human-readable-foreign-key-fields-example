import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IBlog } from 'app/entities/blog/blog/blog.model';
import { BlogService } from 'app/entities/blog/blog/service/blog.service';
import { ITag } from 'app/entities/blog/tag/tag.model';
import { TagService } from 'app/entities/blog/tag/service/tag.service';
import { IPost } from '../post.model';
import { PostService } from '../service/post.service';
import { PostFormService } from './post-form.service';

import { PostUpdateComponent } from './post-update.component';

describe('Post Management Update Component', () => {
  let comp: PostUpdateComponent;
  let fixture: ComponentFixture<PostUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let postFormService: PostFormService;
  let postService: PostService;
  let blogService: BlogService;
  let tagService: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PostUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PostUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    postFormService = TestBed.inject(PostFormService);
    postService = TestBed.inject(PostService);
    blogService = TestBed.inject(BlogService);
    tagService = TestBed.inject(TagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Blog query and add missing value', () => {
      const post: IPost = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const blog: IBlog = { id: '042d3aef-3c6d-4cc6-abd6-e2aa4926cf87' };
      post.blog = blog;

      const blogCollection: IBlog[] = [{ id: '765494ed-b6dd-41b8-8fae-041324677c88' }];
      jest.spyOn(blogService, 'query').mockReturnValue(of(new HttpResponse({ body: blogCollection })));
      const additionalBlogs = [blog];
      const expectedCollection: IBlog[] = [...additionalBlogs, ...blogCollection];
      jest.spyOn(blogService, 'addBlogToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ post });
      comp.ngOnInit();

      expect(blogService.query).toHaveBeenCalled();
      expect(blogService.addBlogToCollectionIfMissing).toHaveBeenCalledWith(
        blogCollection,
        ...additionalBlogs.map(expect.objectContaining),
      );
      expect(comp.blogsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Tag query and add missing value', () => {
      const post: IPost = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const tags: ITag[] = [{ id: 'b0df8a9c-f7e4-4ce2-9fda-0c490c074427' }];
      post.tags = tags;

      const tagCollection: ITag[] = [{ id: '30ee08c2-ade2-4c70-b6d7-b17657c9f28a' }];
      jest.spyOn(tagService, 'query').mockReturnValue(of(new HttpResponse({ body: tagCollection })));
      const additionalTags = [...tags];
      const expectedCollection: ITag[] = [...additionalTags, ...tagCollection];
      jest.spyOn(tagService, 'addTagToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ post });
      comp.ngOnInit();

      expect(tagService.query).toHaveBeenCalled();
      expect(tagService.addTagToCollectionIfMissing).toHaveBeenCalledWith(tagCollection, ...additionalTags.map(expect.objectContaining));
      expect(comp.tagsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const post: IPost = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const blog: IBlog = { id: '4eed323b-2805-48c9-89d6-a2503fa70a88' };
      post.blog = blog;
      const tag: ITag = { id: '28a2ff91-1d1f-4f31-8f5e-241c918d6345' };
      post.tags = [tag];

      activatedRoute.data = of({ post });
      comp.ngOnInit();

      expect(comp.blogsSharedCollection).toContain(blog);
      expect(comp.tagsSharedCollection).toContain(tag);
      expect(comp.post).toEqual(post);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPost>>();
      const post = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(postFormService, 'getPost').mockReturnValue(post);
      jest.spyOn(postService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ post });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: post }));
      saveSubject.complete();

      // THEN
      expect(postFormService.getPost).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(postService.update).toHaveBeenCalledWith(expect.objectContaining(post));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPost>>();
      const post = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(postFormService, 'getPost').mockReturnValue({ id: null });
      jest.spyOn(postService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ post: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: post }));
      saveSubject.complete();

      // THEN
      expect(postFormService.getPost).toHaveBeenCalled();
      expect(postService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPost>>();
      const post = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(postService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ post });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(postService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBlog', () => {
      it('Should forward to blogService', () => {
        const entity = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        jest.spyOn(blogService, 'compareBlog');
        comp.compareBlog(entity, entity2);
        expect(blogService.compareBlog).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTag', () => {
      it('Should forward to tagService', () => {
        const entity = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        jest.spyOn(tagService, 'compareTag');
        comp.compareTag(entity, entity2);
        expect(tagService.compareTag).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
