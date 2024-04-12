import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

/**
 * Interface for interacting with the `DropZoneDirective` API.
 *
 * @function `onDropZoneEnter` emits `dragover` events.
 * @function `onDropZoneExit` emits `dragleave` events.
 * @function `onDropZoneDropt` emits a `FileList`.
 */
export interface DropZone {
  onDropZoneEnter?(): void;
  onDropZoneExit?(): void;
  onDropZoneDrop(files: File[]): void;
}

/**
 * TODO: Describe this.
 */
@Directive({ selector: '[appDropZone]', standalone: true })
export class DropZoneDirective {
  // @HostBinding('class.dropZoneActive') dropZoneActive = false;

  @Output() dropZoneEnter = new EventEmitter();
  @Output() dropZoneExit = new EventEmitter();
  @Output() dropZoneDrop = new EventEmitter<File[]>();

  // Dragover listener
  // TODO: How to fire only once? `take(1)`
  @HostListener('dragover', ['$event'])
  onDropZoneEnter(e: DragEvent) {
    this.dropZoneEnter.emit();
    this.breaker(e);
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  onDropZoneExit(e: DragEvent) {
    this.dropZoneExit.emit();
    this.breaker(e);
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  onDropZoneDrop(e: DragEvent) {
    this.dropZoneDrop.emit(Array.from(e.dataTransfer?.files ?? []));
    this.breaker(e);
  }

  // Prevent default and propogation behavior
  private breaker(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }
}
