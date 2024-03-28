import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, filter, iif, map, mergeMap, of, tap } from 'rxjs';
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

  private tokens$ = new BehaviorSubject<Array<Token>>([]);

  tokens = this.tokens$.asObservable();

  getTokens() {
    Preferences.get({ key: 'tokens' }).then((preferences) => {
      const tokens = JSON.parse(preferences.value || '[]');
      this.tokens$.next(tokens.map((token: string) => new Token(<Token>(URI.parse(token)))));
    });
  }

  saveToken(token: Token) {
    this.tokens
      .pipe(map(tokens => tokens.push(new Token(token))))
      .subscribe(() => this.saveTokens())
      .unsubscribe()
  }

  deleteToken(tokenId: number) {
    this.tokens
      .pipe(map(tokens => tokens.splice(tokenId, 1)))
      .subscribe(() => this.saveTokens())
      .unsubscribe();
  }

  private saveTokens() {
    this.tokens
      .pipe(map(tokens => tokens.map(token => token.toString())))
      .subscribe(tokens => {
        if (tokens.length) {
          Preferences.set({ ...this.key, value: JSON.stringify(tokens) })
        } else {
          Preferences.remove(this.key);
        }
      })
      .unsubscribe();
  }
}

@Pipe({
  name: 'token',
  standalone: true
})
export class TokenPipe implements PipeTransform {
  /**
   * Split MFA code into two, three digit parts
   * separated by a space.
   * 
   * @param token 
   * @returns 
   */
  transform(token: string) {
    return token.replace(/(\d{3})(\d{3})/, "$1 $2")
  }
}

@Pipe({
  name: 'progress',
  standalone: true
})
export class TimeoutPipe implements PipeTransform {
  /**
   * Provides calculus for decrementing an `ion-progress`
   * bar component.
   * 
   * @param timeout 
   * @returns 
   */
  transform(token: Token) {
    return token.timeout
      .pipe(
        map(counter => (counter / token.period))
      )
  };
}