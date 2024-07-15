import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

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
    it('Should call TajUser query and add missing value', () => {
      const blog: IBlog = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const tajUser: ITajUser = { id: 'e9ac1124-1355-42f9-ac3f-372d81fcf396' };
      blog.tajUser = tajUser;

      const tajUserCollection: ITajUser[] = [{ id: '3ddc61e4-82aa-4d93-aa88-d2e6630abed4' }];
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

    it('Should update editForm', () => {
      const blog: IBlog = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const tajUser: ITajUser = { id: '0f3d0a6f-90f5-4e7b-a81c-b97e99583c17' };
      blog.tajUser = tajUser;

      activatedRoute.data = of({ blog });
      comp.ngOnInit();

      expect(comp.tajUsersSharedCollection).toContain(tajUser);
      expect(comp.blog).toEqual(blog);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlog>>();
      const blog = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
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

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlog>>();
      const blog = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
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

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlog>>();
      const blog = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
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
      it('Should forward to tajUserService', () => {
        const entity = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        jest.spyOn(tajUserService, 'compareTajUser');
        comp.compareTajUser(entity, entity2);
        expect(tajUserService.compareTajUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
