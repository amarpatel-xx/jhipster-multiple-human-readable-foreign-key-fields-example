import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITajUser } from 'app/entities/blog/taj-user/taj-user.model';
import { TajUserService } from 'app/entities/blog/taj-user/service/taj-user.service';
import { BlogService } from '../service/blog.service';
import { IBlog } from '../blog.model';
import { BlogFormService } from './blog-form.service';

import { BlogUpdateComponent } from './blog-update.component';

describe('Blog Management Update Component', () => {
  let comp: BlogUpdateComponent;
  let fixture: ComponentFixture<BlogUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let blogFormService: BlogFormService;
  let blogService: BlogService;
  let tajUserService: TajUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlogUpdateComponent],
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
      .overrideTemplate(BlogUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BlogUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    blogFormService = TestBed.inject(BlogFormService);
    blogService = TestBed.inject(BlogService);
    tajUserService = TestBed.inject(TajUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TajUser query and add missing value', () => {
      const blog: IBlog = { id: '0b7b7e1b-829e-42cc-b398-3eae2463fe73' };
      const tajUser: ITajUser = { id: 'a30298cf-223f-4185-9984-7ec30e626f17' };
      blog.tajUser = tajUser;

      const tajUserCollection: ITajUser[] = [{ id: 'a30298cf-223f-4185-9984-7ec30e626f17' }];
      jest.spyOn(tajUserService, 'query').mockReturnValue(of(new HttpResponse({ body: tajUserCollection })));
      const additionalTajUsers = [tajUser];
      const expectedCollection: ITajUser[] = [...additionalTajUsers, ...tajUserCollection];
      jest.spyOn(tajUserService, 'addTajUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ blog });
      comp.ngOnInit();

      expect(tajUserService.query).toHaveBeenCalled();
      expect(tajUserService.addTajUserToCollectionIfMissing).toHaveBeenCalledWith(
        tajUserCollection,
        ...additionalTajUsers.map(expect.objectContaining),
      );
      expect(comp.tajUsersSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const blog: IBlog = { id: '0b7b7e1b-829e-42cc-b398-3eae2463fe73' };
      const tajUser: ITajUser = { id: 'a30298cf-223f-4185-9984-7ec30e626f17' };
      blog.tajUser = tajUser;

      activatedRoute.data = of({ blog });
      comp.ngOnInit();

      expect(comp.tajUsersSharedCollection).toContainEqual(tajUser);
      expect(comp.blog).toEqual(blog);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlog>>();
      const blog = { id: 'd97e55e3-ad93-4a91-b761-e2d09b7c888e' };
      jest.spyOn(blogFormService, 'getBlog').mockReturnValue(blog);
      jest.spyOn(blogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: blog }));
      saveSubject.complete();

      // THEN
      expect(blogFormService.getBlog).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(blogService.update).toHaveBeenCalledWith(expect.objectContaining(blog));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlog>>();
      const blog = { id: 'd97e55e3-ad93-4a91-b761-e2d09b7c888e' };
      jest.spyOn(blogFormService, 'getBlog').mockReturnValue({ id: null });
      jest.spyOn(blogService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blog: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: blog }));
      saveSubject.complete();

      // THEN
      expect(blogFormService.getBlog).toHaveBeenCalled();
      expect(blogService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlog>>();
      const blog = { id: 'd97e55e3-ad93-4a91-b761-e2d09b7c888e' };
      jest.spyOn(blogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(blogService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTajUser', () => {
      it('should forward to tajUserService', () => {
        const entity = { id: 'a30298cf-223f-4185-9984-7ec30e626f17' };
        const entity2 = { id: '114c8b82-56a8-4249-8aa3-4ef21d3cd53c' };
        jest.spyOn(tajUserService, 'compareTajUser');
        comp.compareTajUser(entity, entity2);
        expect(tajUserService.compareTajUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
