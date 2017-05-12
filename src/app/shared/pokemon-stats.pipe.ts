import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stats'
})
export class PokemonStatPipe implements PipeTransform {
  private statMap = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    speed: 'SPE',
    'special-attack': 'SPA',
    'special-defense': 'SPD',
  };

  transform(value: string) {
    return this.statMap[value];
  }
}
