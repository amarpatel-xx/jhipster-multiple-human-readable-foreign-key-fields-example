import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TajUserDetail } from './taj-user-detail';

describe('TajUser Management Detail Component', () => {
  let comp: TajUserDetail;
  let fixture: ComponentFixture<TajUserDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./taj-user-detail').then(m => m.TajUserDetail),
              resolve: { tajUser: () => of({ id: 'a30298cf-223f-4185-9984-7ec30e626f17' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    });
    const library = TestBed.inject(FaIconLibrary);
    library.addIcons(faArrowLeft);
    library.addIcons(faPencilAlt);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TajUserDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load tajUser on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TajUserDetail);

      // THEN
      expect(instance.tajUser()).toEqual(expect.objectContaining({ id: 'a30298cf-223f-4185-9984-7ec30e626f17' }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      vitest.spyOn(globalThis.history, 'back');
      comp.previousState();
      expect(globalThis.history.back).toHaveBeenCalled();
    });
  });
});
