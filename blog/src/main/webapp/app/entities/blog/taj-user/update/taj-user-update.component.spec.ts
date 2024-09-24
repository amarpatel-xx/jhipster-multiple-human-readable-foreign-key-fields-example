import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TajUserService } from '../service/taj-user.service';
import { ITajUser } from '../taj-user.model';
import { TajUserFormService } from './taj-user-form.service';

import { TajUserUpdateComponent } from './taj-user-update.component';

describe('TajUser Management Update Component', () => {
  let comp: TajUserUpdateComponent;
  let fixture: ComponentFixture<TajUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tajUserFormService: TajUserFormService;
  let tajUserService: TajUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TajUserUpdateComponent],
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
      .overrideTemplate(TajUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TajUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tajUserFormService = TestBed.inject(TajUserFormService);
    tajUserService = TestBed.inject(TajUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tajUser: ITajUser = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };

      activatedRoute.data = of({ tajUser });
      comp.ngOnInit();

      expect(comp.tajUser).toEqual(tajUser);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITajUser>>();
      const tajUser = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(tajUserFormService, 'getTajUser').mockReturnValue(tajUser);
      jest.spyOn(tajUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tajUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tajUser }));
      saveSubject.complete();

      // THEN
      expect(tajUserFormService.getTajUser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tajUserService.update).toHaveBeenCalledWith(expect.objectContaining(tajUser));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITajUser>>();
      const tajUser = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(tajUserFormService, 'getTajUser').mockReturnValue({ id: null });
      jest.spyOn(tajUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tajUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tajUser }));
      saveSubject.complete();

      // THEN
      expect(tajUserFormService.getTajUser).toHaveBeenCalled();
      expect(tajUserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITajUser>>();
      const tajUser = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(tajUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tajUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tajUserService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
