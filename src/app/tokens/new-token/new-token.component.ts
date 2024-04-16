import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonProgressBar,
  IonInput,
  IonModal,
  IonButton,
  IonButtons,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { TokenService } from 'src/app/token/token.module';
import { DropZoneService } from 'src/app/drop-zone/drop-zone.module';
import QrScanner from 'qr-scanner';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

/**
 * TODO: Finish detailing this component.
 */
@Component({
  selector: 'app-new-token',
  templateUrl: './new-token.component.html',
  styleUrls: ['./new-token.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonItem,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonProgressBar,
    IonInput,
    IonModal,
    IonButton,
    IonButtons,
    ReactiveFormsModule,
  ],
})
export class NewTokenComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly dropZoneService = inject(DropZoneService);

  readonly uploadedFiles = signal<File[]>([]);

  newAccountForm!: FormGroup;

  /**
   *
   * @param formBuilder
   * @param router
   */
<<<<<<< HEAD
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.dropZoneService.files.subscribe((files) =>
      this.uploadedFiles.set(files),
    );
=======
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.dropZoneService.files
      .pipe(
        tap((files) =>
          files.map((file) => {
            console.log(file);
            const scan = QrScanner.scanImage(file, {
              returnDetailedScanResult: true,
            });
            // // otpauth://totp/totp@authenticationtest.com?secret=I65VU7K5ZQL7WB4E
            // console.log(scan.data);
          })
        )
        // tap((files) => console.log(files))
      )
      .subscribe((files) => this.uploadedFiles.set(files));
>>>>>>> feature/dropzone-qr
  }

  ngOnInit(): void {
    this.newAccountForm = this.formBuilder.group({
      issuer: [null, Validators.required],
      label: [null, ''],
      secret: [
        'I65VU7K5ZQL7WB4E',
        [
          Validators.required,
          Validators.pattern(/^[A-Z2-7]+=*$/),
          this.base32Challenge(),
        ],
      ],
    });
  }

  base32Challenge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value.length % 8 === 0;
      // console.log(forbidden);
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
