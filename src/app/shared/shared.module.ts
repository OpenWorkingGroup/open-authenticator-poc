import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LongPressDirective } from './directives/long-press.directive';

import { FilterPipe } from './pipes/filter.pipe';
import { TimeoutPipe } from './pipes/timeout.pipe';
import { TokenPipe } from './pipes/token.pipe';

/**
 * The SharedServicesModules offers interfaces for the
 * following:
 *
 * @FilterPipe TODO: Describe this
 * @TimeoutPipe TODO: Describe this
 */
@NgModule({
  imports: [
    CommonModule,
    LongPressDirective,
    FilterPipe,
    TimeoutPipe,
    TokenPipe,
  ],
  exports: [LongPressDirective, TimeoutPipe, FilterPipe, TokenPipe],
})
export class SharedServicesModule {}
