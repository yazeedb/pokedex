import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { pokedex } from '/endpoints';
import { fetchPokemon, setPokemon } from './duck';

export const fetchPokemonEpic = (action$, store, { fetch$ }) => action$.pipe(
  ofType(fetchPokemon.type),
  switchMap(() => fetch$(pokedex).pipe(
    switchMap(({ response }) => of(
      setPokemon(response)
    ))
  ))
);

export default [
  fetchPokemonEpic
];
