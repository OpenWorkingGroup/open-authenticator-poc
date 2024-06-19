import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators
} from '@angular/forms';
import { addIcons } from 'ionicons';
import { clipboardOutline } from 'ionicons/icons';
import { map } from 'rxjs';

import { Clipboard } from '@capacitor/clipboard';

import { AccountModule } from '../account.module';
import { AccountService } from '../account.service';
import { HOTP, TOTP } from 'otpauth';

@Component({
  selector: 'app-new-account',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  providers: [],
  imports: [RouterLink, AccountModule, ReactiveFormsModule]
})
export class CreateAccountComponent {
  private readonly accounts = inject(AccountService).accounts;
  private readonly account = signal(<HOTP | TOTP>{});

  newAccountForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    addIcons({ clipboardOutline });

    // TODO: Consult the spec for actual validation
    this.newAccountForm = this.formBuilder.group({
      secret: ['I65VU7K5ZQL7WB4E', Validators.required], // secret: [this.account().secret, Validators.required],
      issuer: [this.account().issuer, Validators.required],
      label: [this.account().label, Validators.maxLength(25)]
    });

    this.newAccountForm.valueChanges
      .pipe(
        map(
          ({ secret, issuer, label }) => <HOTP | TOTP>{ secret, issuer, label }
        )
      )
      .subscribe((account: any) => this.account.set(new TOTP(account)));
  }

  async pasteAuthKey() {
    try {
      const { value } = await Clipboard.read();
      this.newAccountForm.patchValue({ secret: value });
    } catch (error) {
      console.error('Error reading from clipboard: ', error);
    }
  }

  save() {
    this.accounts.update((accounts) => [...accounts, this.account()]);
    this.router.navigate(['/']);
  }
}
