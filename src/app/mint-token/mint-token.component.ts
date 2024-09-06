import { Component, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonModal } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';

import { TokenUriComponent } from '../shared/components/forms/token-uri/token-uri.component';
import { PasteButtonComponent } from 'src/app/shared/components/buttons/paste/paste-button.component';

import { TOTP } from 'otpauth';

import { UIService } from 'src/app/shared/services/ui.service';
import { FormService } from 'src/app/shared/services/form.service';
import { AccountService } from '../shared/services/account.service';

/**
 * TODO: Describe this component
 */
@Component({
  selector: 'app-mint-token',
  templateUrl: './mint-token.component.html',
  styleUrls: ['./mint-token.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PasteButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    TokenUriComponent
  ]
})
export class MintTokenComponent {
  @ViewChild(IonModal) modal!: IonModal;

  private accounts = inject(AccountService).accounts;

  // newTokenForm = this.forms.newTokenForm;
  newTokenForm = this.fb.group({
    secret: this.forms.secret,
    issuer: this.forms.issuer,
    label: this.forms.label
  });

  constructor(
    private forms: FormService,
    private fb: FormBuilder,
    private ui: UIService
  ) {
    addIcons({ alertCircleOutline });
  }

  save() {
    if (this.newTokenForm.valid) {
      this.accounts.update((accounts) => [
        new TOTP(this.newTokenForm.value),
        ...accounts
      ]);
      this.newTokenForm.markAsPristine();
      this.modal.dismiss();
    }

    this.newTokenForm.markAllAsTouched();
  }

  canDismiss = async () =>
    this.newTokenForm.dirty ? await this.ui.confirm() : true;

  didDismiss() {
    this.newTokenForm.reset({}, { emitEvent: false });
  }

  /**
   * Parses a Google Authenticator key string to
   * HOTP/TOTP object and populates the form.
   *
   * @param token
   */
  patchFromAuthKeyURI(token: any) {
    this.newTokenForm.patchValue(this.forms.normalizeNewTokenFormInputs(token));
    this.newTokenForm.markAsDirty();
  }

  /**
   * TODO: Describe this method.
   *
   * @param value
   */
  pasteAction(value: any) {
    this.newTokenForm.patchValue({ secret: value });
    this.newTokenForm.markAsDirty();
  }
}
