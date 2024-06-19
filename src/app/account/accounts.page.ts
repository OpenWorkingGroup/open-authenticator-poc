import { Component, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';

import { displayName, description, homepage } from 'package.json';

import { AccountModule } from './account.module';
import { AccountService } from './account.service';
import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './create/create.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

import { FilterPipe } from '../shared/pipes/filter.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [
    AccountModule,
    AccountComponent,
    CreateAccountComponent,
    ToolbarComponent,
    FilterPipe
  ]
})
export class AccountsPage {
  readonly accounts = inject(AccountService).accounts;

  displayName = displayName;
  description = description;
  homepage = homepage;

  query = '';

  aboutAlertActions = [
    { text: 'Close', role: 'cancel' },
    {
      text: 'More info',
      role: 'destructive',
      handler: () => window.open(homepage, '_blank')
    }
  ];

  constructor(private router: Router) {
    addIcons({ informationCircleOutline });
  }
}
