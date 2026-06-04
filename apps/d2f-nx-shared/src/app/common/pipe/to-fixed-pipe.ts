import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed',
})
export class ToFixedPipe implements PipeTransform {

  // { tva | toFixed:2} , tva récupéré dans value et 2 récupéré dans args[0]
  transform(value: unknown, ...args: unknown[]): unknown {
    let v = <number> value;
    let nbDecimal = <number> args[0];
    return v.toFixed(nbDecimal);
  }

}
