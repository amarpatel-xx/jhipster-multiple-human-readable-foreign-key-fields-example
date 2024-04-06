import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
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
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), BlogUpdateComponent],
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
      .overrideTemplate(BlogUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BlogUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    blogFormService = TestBed.inject(BlogFormService);
    blogService = TestBed.inject(BlogService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const blog: IBlog = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const user: IUser = { id: '9ffeb119-18eb-40e2-97a4-6ad6381e93b0' };
      blog.user = user;

      const userCollection: IUser[] = [{ id: '6caa5db7-bffb-4916-8fbe-1ffa2383fca1' }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ blog });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const blog: IBlog = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const user: IUser = { id: '34e6df04-7306-4492-b479-204a07953826' };
      blog.user = user;

      activatedRoute.data = of({ blog });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
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
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
