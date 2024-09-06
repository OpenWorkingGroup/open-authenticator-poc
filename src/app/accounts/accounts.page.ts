import { Component, inject } from '@angular/core';

import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';

import { displayName, description, homepage } from 'package.json';

import { AccountService } from '../shared/services/account.service';
import { AccountComponent } from './account/account.component';
import { MintTokenComponent } from '../mint-token/mint-token.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';

import { UI } from 'src/globals';
import { IonicBundle } from '../shared/ionic-bundle.module';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [
    AccountComponent,
    FilterPipe,
    IonicBundle,
    MintTokenComponent,
    ToolbarComponent
  ]
})
export class AccountsPage {
  accounts = inject(AccountService).accounts;

  displayName = displayName;
  description = description;
  homepage = homepage;

  query = '';

  // TODO: migrate this UI service?
  aboutAlertActions = [
    UI.buttons.close,
    {
      ...UI.buttons.info,
      handler: () => window.open(homepage, '_blank')
    }
  ];

  constructor() {
    addIcons({ informationCircleOutline });
  }
}
