import { Component, OnDestroy, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicBundle } from 'src/app/shared/ionic-bundle.module';
import {
  FormService,
  TOKEN_URI_REGEX
} from 'src/app/shared/services/form.service';
import { PasteButtonComponent } from 'src/app/shared/components/buttons/paste/paste-button.component';

import { URI } from 'otpauth';

@Component({
  selector: 'app-token-uri',
  templateUrl: './token-uri.component.html',
  styleUrls: ['./token-uri.component.scss'],
  standalone: true,
  imports: [IonicBundle, ReactiveFormsModule, PasteButtonComponent]
})
export class TokenUriComponent implements OnDestroy {
  authKeyUriForm = inject(FormService).authKeyUriForm;
  token = output<any>({ alias: 'authKeyUri' });

  constructor() {
    this.authKeyUriForm.valueChanges.subscribe(({ authKeyUri }) => {
      if (authKeyUri) {
        try {
          this.token.emit(URI.parse(authKeyUri));
        } catch (e) {
          throw Error(`${e}`);
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.authKeyUriForm.reset({}, { emitEvent: false });
  }
  /**
   *
   * @param value
   */
  pasteAction(value: string) {
    this.authKeyUriForm.patchValue({ authKeyUri: value });
  }
}
