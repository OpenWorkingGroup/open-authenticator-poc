import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AccountService } from './shared/services/account.service';

export const ifAccountsExist: CanActivateFn = (route, state) => {
  const accounts = inject(AccountService).accounts;
  const router = inject(Router);
  if (accounts().length) return true;

  router.navigateByUrl('/welcome');
  return false;
};

export const ifNoAccountsExist: CanActivateFn = (route, state) => {
  const accounts = inject(AccountService).accounts;
  const router = inject(Router);
  if (accounts().length) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
