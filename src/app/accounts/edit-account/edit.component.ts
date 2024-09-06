import { Component, model, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';

import { IonicBundle } from 'src/app/shared/ionic-bundle.module';
import { AccountComponent } from '../account/account.component';
import { FormService } from 'src/app/shared/services/form.service';
import { UIService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [IonicBundle, AccountComponent, ReactiveFormsModule]
})
export class EditAccountComponent {
  editAccountForm = inject(FormService).editAccountForm;
  account = model<any>();

  constructor(
    private modalCtrl: ModalController,
    private ui: UIService
  ) {
    effect(() => this.editAccountForm.patchValue(this.account()));
  }

  protected save() {
    if (this.editAccountForm.valid) {
      this.account.update((account) => {
        account(), this.editAccountForm.value;
      });
      this.editAccountForm.markAsPristine();
      this.modalCtrl.dismiss();
    }
  }

  protected cancel() {
    if (this.editAccountForm.dirty) {
      this.ui.confirm('Discard changes?').then((confirm) => {
        if (confirm) {
          this.modalCtrl.dismiss();
        }
      });
    }
    this.modalCtrl.dismiss();
  }
}
