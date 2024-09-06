import { Injectable, effect, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

import { HOTP, TOTP, URI } from 'otpauth';

/**
 * TODO: Describe this.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isInitialized = signal(false);
  accounts = signal<(HOTP | TOTP)[]>([]);

  /**
   * TODO: Describe this.
   */
  constructor() {
    this.loadAccounts();
  }
  /**
   * Load accounts from the local storage.
   * TODO: Implement proper error handling. Log, report and UI message.
   */
  private async loadAccounts() {
    try {
      const { value } = await Preferences.get({ key: environment.keystore });
      const accounts = JSON.parse(value || '[]').map((_account: string) =>
        URI.parse(_account)
      );
      this.accounts.set(accounts);
      this.isInitialized.set(true);
    } catch (error) {
      console.error('Error retrieving accounts:', error);
    }
  }

  // TODO: Throw an actual error.
  private autoSaveAccounts = effect(async () => {
    if (this.isInitialized()) {
      try {
        const accounts = this.accounts().map((account) => account.toString());
        await Preferences.set({
          key: environment.keystore,
          value: JSON.stringify(accounts)
        });
      } catch (error) {
        console.error('Error saving accounts:', error);
      }
    }
  });
}
