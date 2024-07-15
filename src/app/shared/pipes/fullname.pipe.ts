import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {


  transform(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }

  /*transform(value: { firstName: string; lastName: string }): string {
    if (!value) {
      return '';
    }
    const { firstName, lastName } = value;
    return `${firstName} ${lastName}`;
  }*/

}
