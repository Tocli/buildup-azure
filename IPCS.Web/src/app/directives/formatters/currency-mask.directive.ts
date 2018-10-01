import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appCurrencyMask]'
})
export class CurrencyMaskDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let value = this.trim(input.value);
    value = this.truncate(value);

    input.value = value;
  }

  /**
   * Removes invalid values from the input.
   * @param value
   */
  private trim(value: string): string {
    let trimmed = '';

    // Only trim when no decimal found at the start of the value, otherwise
    // truncate everything. Truncates regardless if typed or pasted.
    if ((value.indexOf('.') !== 0)) {

      // Only numbers and decimals
      trimmed = value.replace(/[^\d\.]+/g, '');

      // Only a single decimal and choose the first one found
      if (trimmed.split('.').length > 2) {
        trimmed = trimmed.replace(/\.([^\.]*)$/, '$1');
      }
    }

    return trimmed;
  }

  /**
   * Truncates precision to 2 decimal places.
   * @param value
   */
  private truncate(value: string): string {
    let [integer, mantissa] = value.split('.');

    // Only when the mantissa exists
    if (mantissa !== undefined) {

      // Only allow precision of 2 decimals places
      if (mantissa.length > 2) {
        mantissa = mantissa.substr(0, 2);
      }

      return `${integer}.${mantissa}`;
    }

    return integer;
  }

}
