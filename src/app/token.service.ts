import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
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

  private tokens$ = new BehaviorSubject<Array<Token>>([]);

  tokens = this.tokens$.asObservable();

  /**
   * Collects tokens from storage to build the `tokens$` subscribeable. 
   * 
   * TODO: We need strip the extraneous properties before storing and 
   * reconstituce at init. Typecast here to convert classes?
   */
  getTokens() {
    Preferences.get({key: 'tokens'}).then((preferences) => {
      const tokens = JSON.parse(preferences.value || '[]');
      this.tokens$.next(tokens.map((token: string) => new Token(<Token>(URI.parse(token)))));
    });
  }

  /**
   * Adds new Token to collection and save.
   * 
   * TODO: We need strip the extraneous properties before storing and 
   * reconstituce at init. Typecast here to convert classes?
   * @param token 
   */
  saveToken(token: Token) {
    this.tokens
      .pipe(
        tap((tokens: Array<Token>) => tokens.push(new Token(token))),
        map((tokens: Array<Token>) => tokens.map((token: Token) => token.toString()))
      )
      .subscribe(async tokens => {
        await Preferences.set({key: 'tokens', value: JSON.stringify(tokens)}); 
    });
  }
}

/**
 * The base32Challenge can be used to validate
 * the input passed as the token secret.
 * 
 * @param test 
 */
export function base32Challenge(test: string) {
  try {
    test.length % 8 === 0 && (/^[A-Z2-7]+=*$/).test(test);
  } catch (error) {
    console.error(error);
    throw Error("Invalid token secret.");
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
        map(counter => (counter/token.period))
      )
  };
}