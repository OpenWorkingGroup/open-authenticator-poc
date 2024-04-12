import { Pipe, PipeTransform } from '@angular/core';
import { map, timer } from 'rxjs';

/**
 * Provides calculus for decrementing an `ion-progress`
 * bar component.
 * 
 * @param timeout 
 * @returns 
 */
@Pipe({ 
    name: 'timeout', 
    standalone: true 
})
export class TimeoutPipe implements PipeTransform {

  //  TODO: Can we clean this logic up more?
  transform(period: number) {
    return timer(0, 1000).pipe(
      map(() =>
        Math.floor(period - (new Date().getTime() / 1000) %period )
      ),
      map(timeout => timeout /period )
    )
  };
}