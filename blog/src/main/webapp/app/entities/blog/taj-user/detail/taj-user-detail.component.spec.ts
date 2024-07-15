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
              component: TajUserDetailComponent,
              resolve: { tajUser: () => of({ id: '9fec3727-3421-4967-b213-ba36557ca194' }) },
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
    it('Should load tajUser on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TajUserDetailComponent);

      // THEN
      expect(instance.tajUser()).toEqual(expect.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
