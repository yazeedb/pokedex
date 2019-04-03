import pokemonDetails from './pokemonDetails.json';
import { PokemonDetail } from '../store/interfaces/PokemonDetail.js';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const details = pokemonDetails as PokemonDetail[];

export const getPokemonDetails = (id: number) => {
  const result = details.find((d) => d.details.id === id);

  if (!result) {
    throw new Error('Pokemon not found!');
  }

  return of(result).pipe(delay(400));
};
