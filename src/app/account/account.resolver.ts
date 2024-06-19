import { computed, inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AccountService } from './account.service';

export const accountResolver: ResolveFn<any> = (route, state) => {
  const accountId = Number(route.paramMap.get('id'));
  const account = computed(() => inject(AccountService).accounts()[accountId]);

  if (account()) {
    return { accountId, account: account() };
  }

  console.warn('Account not found.');
  return inject(Router).navigate(['/']);
};
