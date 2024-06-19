import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  untracked
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AlertController } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AccountModule } from '../account.module';
import { AccountComponent } from '../account.component';
import { AccountService } from '../account.service';

import { HOTP, TOTP } from 'otpauth';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [AccountModule, AccountComponent, ReactiveFormsModule, RouterLink]
})
export class EditAccountComponent implements OnInit {
  private readonly accounts = inject(AccountService).accounts;
  private readonly account = signal(<HOTP | TOTP>{});
  private readonly id = signal<number>(0);

  editAccountForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const account = computed(() => untracked(this.accounts)[this.id()]);

    this.editAccountForm = this.formBuilder.group({
      issuer: [account().issuer, Validators.required],
      label: [account().label, '']
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.account.set(data['payload'].account);
      this.id.set(data['payload'].accountId);
    });

    this.editAccountForm.valueChanges
      .pipe(map(({ issuer, label }) => <HOTP | TOTP>{ issuer, label }))
      .subscribe((account: any) => this.account.set(new TOTP(account)));
  }

  updateAccount() {
    if (this.editAccountForm.valid) {
      console.log(this.id(), this.account());
      this.accounts.update(
        (accounts) => ((accounts[this.id()] = this.account()), [...accounts])
      );
      this.router.navigate(['/']);
    }
  }

  async cancel() {
    if (this.editAccountForm.dirty) {
      const alert = await this.alertCtrl.create({
        header: `Are you sure?`,
        message: 'Unsaved changes will be discarded.',
        buttons: [
          {
            text: 'Discard',
            role: 'destructive',
            handler: () => this.router.navigate(['/'])
          },
          { text: 'Cancel', role: 'cancel' }
        ]
      });
      await alert.present();
    } else {
      this.router.navigate(['/']);
    }
  }

  logger = effect(() => console.log(this.id()));
}
