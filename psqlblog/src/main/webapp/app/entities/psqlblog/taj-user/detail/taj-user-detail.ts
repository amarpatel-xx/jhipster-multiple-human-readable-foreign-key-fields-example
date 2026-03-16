import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ITajUser } from '../taj-user.model';

@Component({
  selector: 'jhi-taj-user-detail',
  templateUrl: './taj-user-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class TajUserDetail {
  readonly tajUser = input<ITajUser | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
