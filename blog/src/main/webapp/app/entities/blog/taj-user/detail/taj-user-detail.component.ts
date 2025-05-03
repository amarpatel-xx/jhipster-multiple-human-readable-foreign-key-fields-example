import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ITajUser } from '../taj-user.model';

@Component({
  selector: 'jhi-taj-user-detail',
  templateUrl: './taj-user-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class TajUserDetailComponent {
  tajUser = input<ITajUser | null>(null);

  previousState(): void {
    window.history.back();
  }
}
