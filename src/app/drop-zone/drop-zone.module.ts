import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropZoneDirective, DropZone } from '../drop-zone/drop-zone.directive';
import { DropZoneService } from './drop-zone.service';

export { DropZoneService, DropZone }

/**
 * TODO: Describe this module.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, DropZoneDirective],
  exports: [DropZoneDirective]
})
export class DropZoneModule { }
