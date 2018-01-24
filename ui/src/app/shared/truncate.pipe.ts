import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, maxLenght: string): string {
    return value.length > maxLenght ? value.slice(0, maxLenght) + '...' : value;
  }

}
