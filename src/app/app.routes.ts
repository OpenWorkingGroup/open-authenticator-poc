import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'MFA Tokens',
    loadComponent: () =>
      import('./tokens/tokens.page').then((m) => m.TokensPage),
  },
  {
    path: 'add',
    title: 'New MFA Account',
    loadComponent: () =>
      import('./tokens/new-token/new-token.component').then(
        (m) => m.NewTokenComponent,
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
