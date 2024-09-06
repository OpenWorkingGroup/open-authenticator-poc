import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ToastController,
  ToastOptions
} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController
  ) {}

  private readonly styles = {
    danger: { color: 'danger', icon: 'alert-circle-outline' },
    info: { icon: 'clipboard-outline' }
  };

  private readonly actions = {
    cancel: { text: 'Cancel', role: 'cancel' },
    delete: { text: 'Delete', role: 'destructive' },
    edit: { text: 'Edit', role: 'destructive' },
    undo: { text: 'Undo', role: 'destructive' }
  };

  // Default toast styles
  private readonly options = {
    toast: {
      position: 'bottom' as 'bottom' | 'top' | 'middle',
      positionAnchor: 'footer' as 'footer' | 'header',
      duration: 2500
    }
  };

  /**
   *
   * @param message
   * @returns
   */
  async confirm(message?: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: message || 'Are you sure?',
      buttons: [
        { text: 'Yes', role: 'confirm' },
        { text: 'No', role: 'cancel' }
      ]
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  }

  /**
   * Displays a toast message with the given style and options.
   * @param style The style of the toast ('danger', etc.).
   * @param options Additional options to customize the toast.
   */
  async toast(
    style: 'danger' | keyof typeof this.styles,
    options: ToastOptions = {}
  ) {
    const toast = await this.toastCtrl.create({
      ...this.options.toast,
      ...(this.styles[style] || {}),
      ...options
    });
    await toast.present();
  }
}
