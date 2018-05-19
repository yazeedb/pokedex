import { of } from 'rxjs/observable/of';
import { pluck, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { pokedex } from '/endpoints';
import { fetchPokemon, setPokemon } from './duck';

export const fetchPokemonEpic = (action$, store, { fetch$ }) => action$.pipe(
  ofType(fetchPokemon.type),
  switchMap(() => fetch$(pokedex).pipe(
    pluck('pokemon_entries'),
    switchMap(data => of(
      setPokemon(data)
    ))
  ))
);

export default [
  fetchPokemonEpic
];
