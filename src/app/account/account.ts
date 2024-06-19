import { HOTP, TOTP, URI } from 'otpauth';

export interface Account {
  label: string;
  token: TOTP;
}

/**
 * Represents an account model.
 */
export class AccountModel {
  /**
   * Creates an instance of AccountModel.
   * @param label - The label of the account.
   * @param token - The token of the account.
   */
  constructor(
    private _label?: string,
    private _token?: TOTP | any,
  ) {}

  /**
   * Gets the label of the account.
   */
  get label(): string {
    return this._label ? this._label : '';
  }

  /**
   * Sets the label of the account.
   */
  set label(newLabel: string) {
    this._label = newLabel;
  }

  /**
   * Gets the token of the account.
   */
  get token(): TOTP {
    return this._token;
  }

  /**
   * Sets the token of the account.
   */
  set token(token: TOTP) {
    this._token = token;
  }

  // parse(): HOTP | TOTP {
  //   const token = URI.parse(this._token);
  // }

  stringify(): string {
    const token = URI.stringify(this.token);
    return token;
  }

  /**
   * Validates a token.
   * @param token - The token to validate.
   * @returns True if the token is valid, false otherwise.
   * TODO: Implement this?
   */
  // static validateToken(token: Token): boolean {
  //   return token.secret.length > 0 && token.issuer.length > 0;
  // }
}
