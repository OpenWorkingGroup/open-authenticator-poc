import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Clipboard } from '@capacitor/clipboard';

import { ToastController, ActionSheetController, IonFooter, IonToolbar, IonSearchbar, IonButtons, IonButton, IonIcon, IonContent, IonProgressBar, IonGrid, IonCard, IonRow, IonCol, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonChip, IonHeader, IonTitle, IonText, IonCardSubtitle, IonBadge, IonRippleEffect, IonNote } from "@ionic/angular/standalone";
import { addOutline, informationCircleOutline, heartOutline, trashOutline, clipboardOutline, copyOutline } from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { TokenService, TokenPipe, TimeoutPipe } from 'src/app/token.service';
import { Token } from 'src/app/token';

/**
 * TODO: Finish detailing this component. 
 */
@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.page.html',
  styleUrls: ['./tokens.page.scss'],
  standalone: true,
  imports: [IonNote, IonRippleEffect, IonBadge, IonCardSubtitle, IonText, IonTitle, IonHeader, IonChip, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCol, IonRow, IonCard, IonGrid, IonProgressBar, IonContent, IonFooter, IonToolbar, IonSearchbar, IonButtons, IonButton, IonIcon, CommonModule, TokenPipe, TimeoutPipe]
})
export class TokensPage implements OnInit, OnDestroy {

  tokens!: Observable<Array<Token>>;

  filteredTokens!: Observable<Array<Token>>;

  /**
   * 
   * @param toastController 
   * @param tokenService 
   * @param router 
   */
  constructor(private actionSheetCtrl: ActionSheetController, private toastController: ToastController, private tokenService: TokenService, private router: Router) {
    addIcons({ addOutline, informationCircleOutline, heartOutline, trashOutline, clipboardOutline, copyOutline });
  }

  ngOnInit(): void {
    this.tokens = this.filteredTokens = this.tokenService.tokens;
  }

  /**
   * Copy MFA token to clipboard and signal success.
   * @param string 
   */
  async copyToClipboard(string: string) {
    await Clipboard.write({ string });
    this.toast({ message: `Code copied!`, icon: 'clipboard-outline' });
  }

  /**
   * Applies search filter to tokens.
   * @param filter 
   */
  filterTokens(event: any) {
    this.tokens = this.tokenService.tokens
      .pipe(
        map((tokens: Array<Token>) => tokens.filter(token => token.issuer.toLocaleLowerCase().includes(event.target.value.toLowerCase()))),
      );
  }

  newTokenModal = () => this.router.navigate(['add']);

  deleteToken(tokenId: number) {
    this.tokenService.deleteToken(tokenId);
  }

  /**
   * We toast copy actions.
   * TODO: Replace copy toasy w/ inline/inplace note: Copied! (and reset after 3seconds...)?
   * @param options 
   */
  async toast(options: any) {
    const toast = await this.toastController.create({
      ...options,
      duration: 750,
      position: 'bottom',
      translucent: true
    });

    await toast.present();
  }

  ngOnDestroy(): void {
    // TODO: Implement unsubscribe
    console.log('Cleanup subscriptions.')
  }
}
