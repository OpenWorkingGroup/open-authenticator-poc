import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonModal, IonButton, IonButtons, IonItem, IonList } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  newAccountForm!: FormGroup;

  /**
   * 
   * @param formBuilder 
   * @param router 
   * @param tokenService 
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.newAccountForm = this.formBuilder.group({
      issuer: [null, Validators.required],
      label: [''],
      secret: ['I65VU7K5ZQL7WB4E', [Validators.required, Validators.pattern(/^[A-Z2-7]+=*$/)]]
    })
  }

  // base32Challenge(secret: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const forbidden = control.value.length % 8 === 0;
  //     console.log(forbidden);
  //     return forbidden ? { forbiddenName: { value: control.value } } : null;
  //   };
  // }

  /**
   * The base32Challenge can be used to validate
   * the input passed as the token secret.
   * 
   * @param test 
   */
  base32Challenge(test: string) {
    try {
      test.length % 8 === 0 && (/^[A-Z2-7]+=*$/).test(test);
    } catch (error) {
      console.error(error);
      throw Error("Invalid token secret.");
    }
  }

  async submitNewAccountForm() {
    if (this.newAccountForm.valid) {
      this.tokenService.saveToken(this.newAccountForm.value);
      this.router.navigate(['/']);
    }
  }

  cancel = () => this.router.navigate(['/']);
}
