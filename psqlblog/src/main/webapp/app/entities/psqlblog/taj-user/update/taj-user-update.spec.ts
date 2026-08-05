import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TajUserService } from '../service/taj-user.service';
import { ITajUser } from '../taj-user.model';

import { TajUserFormService } from './taj-user-form.service';
import { TajUserUpdate } from './taj-user-update';

describe('TajUser Management Update Component', () => {
  let comp: TajUserUpdate;
  let fixture: ComponentFixture<TajUserUpdate>;
  let activatedRoute: ActivatedRoute;
  let tajUserFormService: TajUserFormService;
  let tajUserService: TajUserService;

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

    fixture = TestBed.createComponent(TajUserUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tajUserFormService = TestBed.inject(TajUserFormService);
    tajUserService = TestBed.inject(TajUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const tajUser: ITajUser = { id: '114c8b82-56a8-4249-8aa3-4ef21d3cd53c' };

      activatedRoute.data = of({ tajUser });
      comp.ngOnInit();

      expect(comp.tajUser).toEqual(tajUser);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITajUser>();
      const tajUser = { id: 'a30298cf-223f-4185-9984-7ec30e626f17' };
      vitest.spyOn(tajUserFormService, 'getTajUser').mockReturnValue(tajUser);
      vitest.spyOn(tajUserService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tajUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tajUser);
      saveSubject.complete();

      // THEN
      expect(tajUserFormService.getTajUser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tajUserService.update).toHaveBeenCalledWith(expect.objectContaining(tajUser));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITajUser>();
      const tajUser = { id: 'a30298cf-223f-4185-9984-7ec30e626f17' };
      vitest.spyOn(tajUserFormService, 'getTajUser').mockReturnValue({ id: null });
      vitest.spyOn(tajUserService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tajUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tajUser);
      saveSubject.complete();

      // THEN
      expect(tajUserFormService.getTajUser).toHaveBeenCalled();
      expect(tajUserService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ITajUser>();
      const tajUser = { id: 'a30298cf-223f-4185-9984-7ec30e626f17' };
      vitest.spyOn(tajUserService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tajUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tajUserService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
