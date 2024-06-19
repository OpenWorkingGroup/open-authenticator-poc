import { Routes } from '@angular/router';
import { ifNoAccountsExist } from './routes.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    title: 'Welcome!',
    // canActivate: [ifNoAccountsExist],
    loadComponent: () =>
      import('./welcome/welcome.page').then((m) => m.WelcomePage)
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule)
  },
  {
    path: '**',
    redirectTo: '/account'
  }
];
