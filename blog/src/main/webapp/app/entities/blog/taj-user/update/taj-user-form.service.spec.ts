import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../taj-user.test-samples';

import { TajUserFormService } from './taj-user-form.service';

describe('TajUser Form Service', () => {
  let service: TajUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TajUserFormService);
  });

  describe('Service methods', () => {
    describe('createTajUserFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTajUserFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            login: expect.any(Object),
          }),
        );
      });

      it('passing ITajUser should create a new form with FormGroup', () => {
        const formGroup = service.createTajUserFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            login: expect.any(Object),
          }),
        );
      });
    });

    describe('getTajUser', () => {
      it('should return NewTajUser for default TajUser initial value', () => {
        const formGroup = service.createTajUserFormGroup(sampleWithNewData);

        const tajUser = service.getTajUser(formGroup) as any;

        expect(tajUser).toMatchObject(sampleWithNewData);
      });

      it('should return NewTajUser for empty TajUser initial value', () => {
        const formGroup = service.createTajUserFormGroup();

        const tajUser = service.getTajUser(formGroup) as any;

        expect(tajUser).toMatchObject({});
      });

      it('should return ITajUser', () => {
        const formGroup = service.createTajUserFormGroup(sampleWithRequiredData);

        const tajUser = service.getTajUser(formGroup) as any;

        expect(tajUser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITajUser should not enable id FormControl', () => {
        const formGroup = service.createTajUserFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTajUser should disable id FormControl', () => {
        const formGroup = service.createTajUserFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
