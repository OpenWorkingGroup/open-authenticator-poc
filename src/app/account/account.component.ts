import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { Clipboard } from '@capacitor/clipboard';
import {
  AlertController,
  ActionSheetController,
  ToastController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { copyOutline, clipboardOutline, trashOutline } from 'ionicons/icons';

import { LongPressDirective } from '../shared/directives/long-press.directive';
import { TimeoutPipe } from '../shared/pipes/timeout.pipe';
import { TokenPipe } from '../shared/pipes/token.pipe';

import { AccountModule } from './account.module';
import { AccountService } from 'src/app/account/account.service';
import { HOTP, TOTP } from 'otpauth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [AccountModule, LongPressDirective, TimeoutPipe, TokenPipe]
})
export class AccountComponent {
  private readonly accounts = inject(AccountService).accounts;
  readonly account = input.required<TOTP>();
  readonly id = input.required<number>();

  private readonly actions = {
    cancel: { text: 'Cancel', role: 'cancel' },
    delete: { text: 'Delete', role: 'destructive' },
    edit: { text: 'Edit', role: 'destructive' },
    undo: { text: 'Undo', role: 'destructive' }
  };

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({ copyOutline, clipboardOutline, trashOutline });
  }

  // TODO: Update inner HTML of button w/ "Copied!" for short duration
  async copyToClipboard(ev: any, string: string) {
    // console.log(ev.srcElement);
    Clipboard.write({ string });

    this.toast({ message: 'Copied!', icon: 'clipboard-outline' });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          ...this.actions.edit,
          handler: () => this.router.navigate(['account', this.id(), 'edit'])
        },
        {
          ...this.actions.delete,
          handler: async () => this.confirmDelete()
        },
        this.actions.cancel
      ]
    });
    actionSheet.present();
  }

  private async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      // subHeader: 'Confirm delete',
      message: `This action will permanately delete ${this.account().issuer}.`,
      buttons: [
        {
          ...this.actions.delete,
          handler: () => {
            this.accounts.update((accounts) =>
              accounts.filter((account) => account !== this.account())
            );

            this.toast({
              message: `${this.account().issuer} removed!`,
              icon: 'trash-outline',
              duration: 2500,
              buttons: [
                {
                  ...this.actions.undo,
                  handler: () => this.undoDelete()
                }
              ]
            });
          }
        },
        this.actions.cancel
      ]
    });
    await alert.present();
  }

  private undoDelete() {
    this.accounts.update((accounts) => [...accounts, this.account()]);
  }

  private async toast(inputs: any) {
    const toast = await this.toastCtrl.create({
      positionAnchor: 'footer',
      duration: 500,
      ...inputs
    });
    toast.present();
  }
}
