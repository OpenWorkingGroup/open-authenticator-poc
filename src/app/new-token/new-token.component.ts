import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonModal, IonButton, IonButtons, IonItem, IonList } from "@ionic/angular/standalone";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { TokenService } from 'src/app/token.service';

/**
 * TODO: Finish detailing this component. 
 */
@Component({
  selector: 'app-new-token',
  templateUrl: './new-token.component.html',
  styleUrls: ['./new-token.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonModal, IonButton, IonButtons, ReactiveFormsModule]
})
export class NewTokenComponent implements OnInit {

  tokenService = inject(TokenService);

  newAccountForm!: FormGroup;

  /**
   * 
   * @param formBuilder 
   * @param router 
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newAccountForm = this.formBuilder.group({
      issuer: [null, Validators.required],
      label: [''],
      secret: ['I65VU7K5ZQL7WB4E', [Validators.required, Validators.pattern(/^[A-Z2-7]+=*$/), this.base32Challenge()]]
    })
  }

  /**
   * The base32Challenge can be used to validate
   * the input passed as the token secret.
   */
  base32Challenge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value.length % 8 === 0;
      console.log(forbidden);
      return !forbidden ? { invalideBase32: { value: control.value } } : null;
    };
  }

  async submitNewAccountForm() {
    if (this.newAccountForm.valid) {
      this.tokenService.create(this.newAccountForm.value);
      this.router.navigate(['/']);
    }
  }

  cancel = () => this.router.navigate(['/']);
}
