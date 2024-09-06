import { Injectable } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

export const TOKEN_URI_REGEX =
  /^otpauth:\/\/([ht]otp)\/(.+)\?([A-Z0-9.~_-]+=[^?&]*(?:&[A-Z0-9.~_-]+=[^?&]*)*)$/i;

@Injectable({
  providedIn: 'root'
})
export class FormService {
  /**
   *
   */
  private authKeyUri = new FormControl('', {
    nonNullable: true,
    validators: [Validators.pattern(TOKEN_URI_REGEX)]
  });

  /**
   *
   */
  secret = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });

  /**
   *
   */
  issuer = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });

  /**
   *
   */
  label = new FormControl('', { nonNullable: true });

  /**
   * TODO: Why are `nonNullable` properties required on each control
   * on a NonNullableFormBuilder object?
   */
  newTokenForm = this.fb.group({
    secret: this.secret,
    issuer: this.issuer,
    label: this.label
  });

  authKeyUriForm = this.fb.group({
    authKeyUri: this.authKeyUri
  });

  /**
   * TODO: Why are `nonNullable` properties required on each control
   * on a NonNullableFormBuilder object?
   */
  editAccountForm = this.fb.group({
    issuer: this.issuer,
    label: this.label
  });

  /**
   *
   * @param formbBuilder
   */
  constructor(private fb: NonNullableFormBuilder) {}

  normalizeNewTokenFormInputs(token: any) {
    return {
      issuer: token.issuer.replace(/:$/, ''),
      label: token.label !== 'null' ? token.label : '',
      secret: token.secret.base32
    };
  }
}
