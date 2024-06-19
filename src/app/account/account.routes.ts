import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { accountResolver } from './account.resolver';
import { ifAccountsExist } from '../routes.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Accounts',
    // canActivate: [ifAccountsExist],
    loadComponent: () => import('./accounts.page').then((m) => m.AccountsPage)
  },
  {
    path: 'create',
    title: 'New Account',
    loadComponent: () =>
      import('./create/create.component').then((m) => m.CreateAccountComponent)
  },
  {
    path: ':id/edit',
    title: 'Edit Account',
    resolve: { payload: accountResolver },
    loadComponent: () =>
      import('./edit/edit.component').then((m) => m.EditAccountComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
