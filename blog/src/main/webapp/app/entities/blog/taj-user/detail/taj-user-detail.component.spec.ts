import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TajUserDetailComponent } from './taj-user-detail.component';

describe('TajUser Management Detail Component', () => {
  let comp: TajUserDetailComponent;
  let fixture: ComponentFixture<TajUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TajUserDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./taj-user-detail.component').then(m => m.TajUserDetailComponent),
              resolve: { tajUser: () => of({ id: 'a30298cf-223f-4185-9984-7ec30e626f17' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TajUserDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TajUserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load tajUser on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TajUserDetailComponent);

      // THEN
      expect(instance.tajUser()).toEqual(expect.objectContaining({ id: 'a30298cf-223f-4185-9984-7ec30e626f17' }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
