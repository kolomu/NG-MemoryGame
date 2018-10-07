import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.toString();
    const secondIndex = value.length - 2;
    if (secondIndex > 0) {
      return this.stringInsert(value, ':', secondIndex);
    } else {
      return '0' + this.stringInsert(value, ':', secondIndex);
    }

  }


  private stringInsert(inputString: string, insertString: string, position: number): string {
    const fullInputString = inputString;
    return inputString.slice(0, position) + insertString + fullInputString.substring(position);
  }

}
