import { Pipe, PipeTransform } from '@angular/core';
import { Token } from 'src/app/token/token'; // TODO: I think we can be more generic in the filter?

@Pipe({ 
    name: 'filter', 
    standalone: true, 
    pure: false // TODO: Do we need this here?
})
export class FilterPipe implements PipeTransform {

  /**
   * 
   * @param Tokens[]
   * @param query
   * @returns 
   * 
   * TODO: Be more generic with input. Add the `parameters` argument to narrow down serach.
   */
  transform(tt: Token[], q: string, property: string = 'issuer'): Token[] {

    if (!q) return tt;

    return tt.filter((t) =>
      t.issuer.toLowerCase().includes(q.toLowerCase())
    );
  }
}