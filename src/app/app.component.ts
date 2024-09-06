import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { map, of } from 'rxjs';

// import { NgxDropZoneModule } from 'ngx-drop-zone';

import { DropZoneService, DropZoneModule } from './drop-zone/drop-zone.module';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonApp, IonRouterOutlet, DropZoneModule]
})
export class AppComponent {
  readonly accounts = inject(AccountService).accounts;
  readonly dropzone = inject(DropZoneService);

  dropZoneActive = false;

  // Toggle Dropzone overlay visibility
  onDropZoneEnter = () => !this.dropZoneActive;
  onDropZoneExit = () => !this.dropZoneActive;

  // Handle Dropzone dropped files
  onDropZoneDrop = (files: File[]): void => {
    of(files)
      .pipe(map((files: File[]) => this.dropzone.files$.next(files)))
      .subscribe(() => {
        throw Error('Dropzone method not yet implemented.');
      });
  };
}
