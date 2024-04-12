import { timer, map } from 'rxjs';
import * as OTPAuth from 'otpauth';

/**
 * `Token` is an overlay to the `OTPAuth.TOTP` and `OTPAuth.HOTP` 
 * classes providing functional accessors and modifiers.
 * 
 * TODO: convert class name to TOTP. HOTP may need a "decorator"
 * similar to this as well... We need to provide functionality for 
 * both token types.
 * 
 * `export class TOTP extends OTPAuth.TOTP {}`
 */
export class Token extends OTPAuth.TOTP {
  
  // otp: OTPAuth.TOTP | OTPAuth.HOTP;

  /**
   * Provides an instance specific timer based on 
   * the TOTP algorithm `TOTP = HOTP(K, T)`.
   */
  timeout = timer(0, 1000).pipe(
      map(() => 
        Math.floor(this.period - (new Date().getTime() / 1000) % this.period)
      )
    );

  /**
   * The Token object is an overlay to the OTPAuth.TOTP
   * and OTPAuth.HOTP classes providing functional 
   * accessors and modifiers.
   * 
   * Initializes token with TOTP defaults.
   * Override defaults by passing values as `token`.
   * @param token 
   */
  constructor(token: Token) {
    super();
    // Initialize token with TOTP defaults.
    Object.assign(this, new OTPAuth.TOTP(token));
  }
}