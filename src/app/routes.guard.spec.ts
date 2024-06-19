import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ifAccounts, ifNoAccounts } from './routes.guard';

describe('hasAccountsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => ifAccounts(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
