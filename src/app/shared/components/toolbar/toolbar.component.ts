import { Component, HostListener, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IonicBundle } from 'src/app/shared/ionic-bundle.module';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [IonicBundle, RouterLink]
})
export class ToolbarComponent {
  filter = output<string>();
  query = signal('');

  // TODO: Add searchbar focus shortcut keystrokes.
  // Listen for "/", "s", "TAB?"
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.filter.emit(event.key);
  }

  constructor() {
    addIcons({ addOutline });
  }
}
