import { Routes } from '@angular/router';
import { ifAccountsExist, ifNoAccountsExist } from './routes.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    title: 'Welcome!',
    // canActivate: [ifNoAccountsExist],
    loadComponent: () =>
      import('./welcome/welcome.page').then((m) => m.WelcomePage)
  },
  {
    path: 'mint',
    title: 'Mint New Token',
    loadComponent: () =>
      import('./mint-token/mint-token.component').then(
        (m) => m.MintTokenComponent
      )
  },
  {
    path: '',
    title: 'Accounts',
    // canActivate: [ifAccountsExist],
    loadComponent: () =>
      import('./accounts/accounts.page').then((m) => m.AccountsPage)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
