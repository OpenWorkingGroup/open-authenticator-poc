import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  filter,
  from,
  merge,
  switchMap,
  toArray,
} from 'rxjs';
import { Preferences } from '@capacitor/preferences';

import { URI } from 'otpauth';
import { Token } from 'src/app/token/token';

/**
 * Provides access to the storage interface.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly key = { key: 'tokens' };
  private readonly tokens$ = new BehaviorSubject<Token[]>([]);
  private readonly filter$ = new Subject<string>();

  readonly tokens = merge(
    this.tokens$,
    this.filter$.pipe(
      switchMap((q) =>
        from(this.tokens$.value).pipe(
          filter((t) => t.issuer.toLowerCase().includes(q.toLowerCase())),
          toArray(),
        ),
      ),
    ),
  );

  constructor() {
    Preferences.get(this.key)
      .then((preferences) => JSON.parse(preferences.value || '[]'))
      .then((tt: string[]) =>
        this.tokens$.next(tt.map((t) => new Token(<Token>URI.parse(t)))),
      );
  }

  filter = (q: string) => this.filter$.next(q);

  create(t: Token) {
    this.tokens$.next(this.tokens$.value.concat(new Token(t)));
    this.saveTokens();
  }

  delete(t: Token) {
    this.tokens$.next(
      this.tokens$.value.filter((tt) => tt.secret !== t.secret),
    );
    this.saveTokens();
  }

  private saveTokens() {
    const tt = this.tokens$.value.map((t) => t.toString());

    if (tt.length) {
      Preferences.set({ ...this.key, value: JSON.stringify(tt) });
    } else {
      Preferences.remove(this.key);
    }
  }
}
