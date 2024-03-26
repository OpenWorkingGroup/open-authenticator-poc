import { timer, map, take, tap, repeat, finalize, takeWhile } from 'rxjs';

import { TOTP } from 'otpauth';

/**
 * `Token` is an overlay to the `OTPAuth.TOTP` and `OTPAuth.HOTP` 
 * classes providing functional accessors and modifiers.
 */
export class Token extends TOTP {

  /**
   * Provides an instance specific interface for working
   * with the timer.
   */
  timeout = timer(0, 1000)
    .pipe(
      // Reverse incrementer for countdown effect
      map(counter => this.period - counter), 
      // Adding 1 so countdown can hit zero
      take(this.period + 1),
      // Reset the code
      finalize(() => this.code()),
      repeat()
    );

  /**
   * Generate a TOTP code.
   * @returns 
   */
  code = () => TOTP.generate(Object(this));
  
  /**
   * The Token object is an overlay to the OTPAuth.TOTP
   * and OTPAuth.HOTP classes providing functional 
   * accessors and modifiers.
   * 
   * Initializes token with TOTP defaults.
   * Override defaults by passing values as `token`.
   * @param token 
   */
  constructor(token?: Token) {
    super();
    // Initialize token with TOTP defaults.
    Object.assign(this, new TOTP(<Token>(token)) ?? TOTP.defaults);
    console.log(this);
  }
}