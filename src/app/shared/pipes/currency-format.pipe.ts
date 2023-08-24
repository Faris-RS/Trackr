import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})

export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, locale: string = 'en-US'): string {
    const formattedValue = value.toLocaleString(locale);
    return formattedValue;
  }
}
