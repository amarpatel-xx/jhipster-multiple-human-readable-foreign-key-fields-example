import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IPost } from 'app/entities/blog/post/post.model';
import { PostService } from 'app/entities/blog/post/service/post.service';
import { TagService } from '../service/tag.service';
import { ITag } from '../tag.model';
import { TagFormService } from './tag-form.service';

import { TagUpdateComponent } from './tag-update.component';

describe('Tag Management Update Component', () => {
  let comp: TagUpdateComponent;
  let fixture: ComponentFixture<TagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tagFormService: TagFormService;
  let tagService: TagService;
  let postService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TagUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tagFormService = TestBed.inject(TagFormService);
    tagService = TestBed.inject(TagService);
    postService = TestBed.inject(PostService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Post query and add missing value', () => {
      const tag: ITag = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const posts: IPost[] = [{ id: '3a5c1182-205a-4d5f-8651-044075ca3a79' }];
      tag.posts = posts;

      const postCollection: IPost[] = [{ id: 'de3dab21-3ac4-41eb-a280-857133c030e5' }];
      jest.spyOn(postService, 'query').mockReturnValue(of(new HttpResponse({ body: postCollection })));
      const additionalPosts = [...posts];
      const expectedCollection: IPost[] = [...additionalPosts, ...postCollection];
      jest.spyOn(postService, 'addPostToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      expect(postService.query).toHaveBeenCalled();
      expect(postService.addPostToCollectionIfMissing).toHaveBeenCalledWith(
        postCollection,
        ...additionalPosts.map(expect.objectContaining),
      );
      expect(comp.postsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tag: ITag = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const post: IPost = { id: 'a3458043-f3a6-40cc-bdec-d3ecd3d0f2ec' };
      tag.posts = [post];

      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      expect(comp.postsSharedCollection).toContain(post);
      expect(comp.tag).toEqual(tag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITag>>();
      const tag = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(tagFormService, 'getTag').mockReturnValue(tag);
      jest.spyOn(tagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tag }));
      saveSubject.complete();

      // THEN
      expect(tagFormService.getTag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tagService.update).toHaveBeenCalledWith(expect.objectContaining(tag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITag>>();
      const tag = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(tagFormService, 'getTag').mockReturnValue({ id: null });
      jest.spyOn(tagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tag }));
      saveSubject.complete();

      // THEN
      expect(tagFormService.getTag).toHaveBeenCalled();
      expect(tagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITag>>();
      const tag = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(tagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePost', () => {
      it('Should forward to postService', () => {
        const entity = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        jest.spyOn(postService, 'comparePost');
        comp.comparePost(entity, entity2);
        expect(postService.comparePost).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
