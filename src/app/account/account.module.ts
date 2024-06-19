import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonAlert,
  IonCol,
  IonCard,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonProgressBar,
  IonNote,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
  IonInput,
  IonCardContent,
  IonLabel,
  IonToggle
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators
} from '@angular/forms';
import { AccountRoutingModule } from './account.routes';

@NgModule({
  imports: [
    CommonModule,
    IonAlert,
    IonContent,
    IonCol,
    IonCard,
    IonRow,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonNote,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
    IonInput,
    IonCardContent,
    IonLabel,
    IonToggle
  ],
  declarations: [],
  exports: [
    IonAlert,
    IonContent,
    IonCol,
    IonCard,
    IonRow,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonNote,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
    IonInput,
    IonCardContent,
    IonLabel,
    IonToggle,
    AccountRoutingModule,
    CommonModule
  ]
})
export class AccountModule {}
