import { Component, input } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';

import { IonButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { copyOutline, clipboardOutline } from 'ionicons/icons';

import { UIService } from 'src/app/shared/services/ui.service';
import { TokenPipe } from 'src/app/shared/pipes/token.pipe';

@Component({
  selector: 'app-copy-token',
  templateUrl: './copy-token.component.html',
  styleUrls: ['./copy-token.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, TokenPipe]
})
export class CopyTokenComponent {
  value = input.required<string>();

  constructor(private ui: UIService) {
    addIcons({ copyOutline, clipboardOutline });
  }

  // TODO: Update inner HTML of button w/ "Copied!" for short duration
  // TODO: Implement proper error handling
  async copyToClipboard($event: any, string: string) {
    try {
      // console.log($event.srcElement, $event.target);
      await Clipboard.write({ string });
      this.ui.toast('info', { message: 'Copied!', duration: 500 });
    } catch (error) {
      throw Error(`${error}`);
    }
  }
}
