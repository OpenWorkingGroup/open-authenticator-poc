import { Pipe, PipeTransform } from '@angular/core';

/**
 * TODO: Describe pipe usage
 */
@Pipe({
  name: 'token',
  standalone: true,
})
export class TokenPipe implements PipeTransform {
  /**
   * Split MFA code into two three digit parts
   * separated by a space.
   *
   * @param token
   * @returns
   */
  transform(token: string) {
    return token.replace(/(\d{3})(\d{3})/, '$1 $2');
  }
}
