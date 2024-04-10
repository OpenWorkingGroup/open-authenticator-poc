import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, from, map, merge, switchMap, timer, toArray } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

import { URI } from 'otpauth';
import { Token } from 'src/app/token';

/**
 * Provides access to the storage interface.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly key = { key: 'tokens' };
  private readonly tokens$ = new BehaviorSubject<Token[]>([]);
  private readonly filter$ = new Subject<string>();
  readonly tokens = merge(this.tokens$, this.filter$.pipe(
    switchMap(q =>
      from(this.tokens$.value).pipe(
        filter((t) => t.issuer.toLowerCase().includes(q.toLowerCase())),
        toArray()
      )
    )))

  constructor() {
    Preferences.get(this.key)
      .then(preferences => JSON.parse(preferences.value || '[]'))
      .then((tt: string[]) => this.tokens$.next(tt.map(t => new Token(<Token>(URI.parse(t))))));
  }

  filter = (q: string) => this.filter$.next(q);

  create(t: Token) {
    this.tokens$.next(this.tokens$.value.concat(new Token(t)));
    this.saveTokens();
  }

  delete(t: Token) {
    this.tokens$.next(this.tokens$.value.filter((tt) => tt.secret !== t.secret));
    this.saveTokens();
  }

  private saveTokens() {
    const tt = this.tokens$.value.map(t => t.toString());

    if (tt.length) {
      Preferences.set({ ...this.key, value: JSON.stringify(tt) })
    } else {
      Preferences.remove(this.key)
    }
  }
}

@Pipe({ name: 'token', standalone: true })
export class TokenPipe implements PipeTransform {
  /**
   * Split MFA code into two three digit parts
   * separated by a space.
   * 
   * @param token 
   * @returns 
   */
  transform(token: string) {
    return token.replace(/(\d{3})(\d{3})/, "$1 $2")
  }
}

@Pipe({ name: 'progress', standalone: true })
export class TimeoutPipe implements PipeTransform {
  /**
   * Provides calculus for decrementing an `ion-progress`
   * bar component.
   * 
   * @param timeout 
   * @returns 
   */
  transform(token: Token) {
    return timer(0, 1000).pipe(
      map(() =>
        Math.floor(token.period - (new Date().getTime() / 1000) % token.period)
      ),
      map(timeout => timeout / token.period)
    )
  };
}

@Pipe({ name: 'filter', standalone: true, pure: false })
export class FilterPipe implements PipeTransform {

  /**
   * 
   * @param Tokens[]
   * @param query
   * @returns 
   */
  transform(tt: Token[], q: string): Token[] {
    return tt;
    // return tt.filter((t) => t.issuer.toLowerCase().includes(q.toLowerCase()));
    console.log('pipe run');
    // if (tt.length === 0 || !q) {
    //   return tt;
    // }
    // let ftt: Token[] = [];
    // for (let t of tt) {
    //   if (t.issuer.toLowerCase().includes(q.toLowerCase())) {
    //     ftt.push(t);
    //   }
    // }
    return [new Token(<Token>{})];
  }
}