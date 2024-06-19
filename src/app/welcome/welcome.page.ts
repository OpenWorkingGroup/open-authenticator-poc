import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonRippleEffect,
  IonFooter,
  IonIcon,
} from '@ionic/angular/standalone';
import { heartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonFooter,
    IonRippleEffect,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterLink,
  ],
})
export class WelcomePage {
  constructor() {
    addIcons({ heartOutline });
  }
}
