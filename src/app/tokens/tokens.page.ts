import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  ActionSheetController,
  AlertController,
  ToastController,
  IonFooter,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonProgressBar,
  IonGrid,
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonHeader,
  IonTitle,
  IonText,
  IonCardSubtitle,
  IonRippleEffect,
  IonToast,
  IonActionSheet,
  IonItem,
  IonList,
  IonFab,
  IonFabButton,
  IonFabList,
  IonInput,
} from '@ionic/angular/standalone';
import { Clipboard } from '@capacitor/clipboard';

import { addIcons } from 'ionicons';
import {
  addOutline,
  heartOutline,
  clipboardOutline,
  copyOutline,
  informationCircleOutline,
} from 'ionicons/icons';

import { SharedServicesModule } from '../shared/shared.module';
import { TokenModule, TokenService, Token } from '../token/token.module';

import { NewTokenComponent } from './new-token/new-token.component';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.page.html',
  styleUrls: ['./tokens.page.scss'],
  standalone: true,
  imports: [
    SharedServicesModule,
    IonInput,
    IonFabList,
    IonFabButton,
    IonFab,
    IonList,
    IonItem,
    IonActionSheet,
    IonToast,
    IonRippleEffect,
    IonCardSubtitle,
    IonText,
    IonTitle,
    IonHeader,
    IonLabel,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCol,
    IonRow,
    IonCard,
    IonGrid,
    IonProgressBar,
    IonContent,
    IonFooter,
    IonToolbar,
    IonSearchbar,
    IonButtons,
    IonButton,
    IonIcon,
    CommonModule,
    NewTokenComponent,
    TokenModule,
  ],
})
export class TokensPage {
  private readonly tokenService = inject(TokenService);

  tokens = this.tokenService.tokens;

  filterBy!: string;

  /**
   *
   * @param router
   */
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({
      addOutline,
      heartOutline,
      informationCircleOutline,
      clipboardOutline,
      copyOutline,
    });
  }

  filterTokens = (q: string) => this.tokenService.filter(q);

  newTokenModal = () => this.router.navigate(['add']);

  async copyToClipboard(ev: any, string: string) {
    console.log(ev.srcElement);
    Clipboard.write({ string });

    const toast = await this.toastCtrl.create({
      message: 'Copied!',
      icon: 'clipboard-outline',
      positionAnchor: 'footer',
      duration: 500,
    });

    await toast.present();
  }

  async presentActionSheet(t: Token) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            const alert = await this.alertCtrl.create({
              header: `Delete ${t.issuer}`,
              buttons: [
                {
                  text: 'Delete',
                  role: 'destructive',
                  handler: () => this.tokenService.delete(t),
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                },
              ],
            });

            await alert.present();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }
}
