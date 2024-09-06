import { Component, inject, input } from '@angular/core';

import { UI } from 'src/globals';
import { UIService } from '../../shared/services/ui.service';

import {
  ActionSheetController,
  ModalController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import { IonicBundle } from '../../shared/ionic-bundle.module';
import { LongPressDirective } from '../../shared/directives/long-press.directive';
import { TimeoutPipe } from '../../shared/pipes/timeout.pipe';

import { AccountService } from '../../shared/services/account.service';
import { EditAccountComponent } from '../edit-account/edit.component';
import { CopyTokenComponent } from '../../shared/components/buttons/copy-token/copy-token.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [IonicBundle, LongPressDirective, TimeoutPipe, CopyTokenComponent]
})
export class AccountComponent {
  accounts = inject(AccountService).accounts;

  account = input.required<any>();
  id = input.required<number>();

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private ui: UIService,
    private modalCtrl: ModalController
  ) {
    addIcons({ trashOutline });
  }

  async presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          ...UI.ACTIONS.edit,
          handler: async () => this.editAccount()
        },
        {
          ...UI.ACTIONS.delete,
          handler: () => this.deleteAccount()
        }
      ]
    });
    (await actionSheet).present();
  }

  private async editAccount() {
    const modal = await this.modalCtrl.create({
      component: EditAccountComponent,
      componentProps: {
        id: this.id,
        account: this.account,
        accounts: this.accounts
      }
    });
    modal.present();
  }

  private deleteAccount() {
    this.ui.confirm().then((confirm) => {
      if (confirm) {
        this.accounts.update((accounts) =>
          accounts.filter((account) => account !== this.account())
        );

        this.ui.toast('danger', {
          message: `${this.account().issuer} removed!`,
          buttons: [
            {
              ...UI.ACTIONS.undo,
              handler: () =>
                this.accounts.update((accounts) => [
                  ...accounts,
                  this.account()
                ])
            }
          ]
        });
      }
    });
  }
}
