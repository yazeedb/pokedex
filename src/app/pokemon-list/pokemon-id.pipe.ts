import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pkmnId'
})
export class PokemonIdPipe implements PipeTransform {
  transform(value: number) {
    let valueString = value.toString();

    while (valueString.length < 3) {
      valueString = '0' + valueString;
    }

    return valueString;
  }
}
