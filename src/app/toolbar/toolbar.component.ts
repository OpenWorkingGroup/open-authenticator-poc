import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonFooter,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonFooter,
    IonToolbar,
    IonSearchbar,
    RouterLink
  ]
})
export class ToolbarComponent {
  @Output() filter = new EventEmitter<string>();

  // TODO: Add searchbar focus shortcut keystrokes.
  // Listen for "/", "s", "TAB?"
  @HostListener('document.keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
  }

  constructor() {
    addIcons({ addOutline });
  }
}
