import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

/**
 * HOW TO USE:
 * <div appLongPress [holdTime]="500" (appLongPressDo)="holdHandler(anything)"></div>
 *
 * @param longPressTime (Optional). Will `emit()` every 100ms by default.
 */
@Directive({
  selector: '[appLongPress]',
  standalone: true,
})
export class LongPressDirective {
  @Input() longPressTimeout = 500;
  @Output() appLongPressDo: EventEmitter<number> = new EventEmitter();

  private readonly handle = new Subject();

  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  @HostListener('touchmove', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('mousemove', ['$event'])
  onExit = () => this.handle.next(false);

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  startHold = ($event: any) =>
    interval(this.longPressTimeout)
      .pipe(take(1), takeUntil(this.handle))
      .subscribe(() => this.appLongPressDo.emit($event));
}
