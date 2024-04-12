import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import {
  DropZoneModule,
  DropZoneService,
  DropZone,
} from './drop-zone/drop-zone.module';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, DropZoneModule],
})
export class AppComponent implements DropZone {
  private readonly dzService = inject(DropZoneService);

  dropZoneActive = false;

  constructor(private router: Router) {}

  // Toggle overlay visibility
  onDropZoneEnter = () => !this.dropZoneActive;
  onDropZoneExit = () => !this.dropZoneActive;

  // // Hand dropped files
  onDropZoneDrop(files: File[]): void {
    of(files)
      .pipe(map((files: File[]) => this.dzService.files$.next(files)))
      .subscribe(() => this.router.navigate(['add']));
  }
}
