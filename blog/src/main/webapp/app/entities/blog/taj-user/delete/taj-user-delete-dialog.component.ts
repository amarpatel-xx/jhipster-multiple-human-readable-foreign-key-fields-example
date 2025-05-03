import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITajUser } from '../taj-user.model';
import { TajUserService } from '../service/taj-user.service';

@Component({
  templateUrl: './taj-user-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TajUserDeleteDialogComponent {
  tajUser?: ITajUser;

  protected tajUserService = inject(TajUserService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.tajUserService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
