import { Component } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons';

import { MintTokenComponent } from '../mint-token/mint-token.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule, MintTokenComponent]
})
export class WelcomePage {
  constructor() {
    addIcons({ heartOutline });
  }
}
