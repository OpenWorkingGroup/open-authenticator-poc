import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenService } from './token.service';
import { Token } from './token';

export { TokenService, Token };

@NgModule({
  imports: [CommonModule],
  providers: [TokenService]
})
export class TokenModule { }
