import { map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { AppEpic } from '../rootEpic';
import { FETCH_POKEMON_LIST, PokemonPreviewList } from './types';
import { pokemonListUrl } from '../../constants';
import { fetchSuccess, fetchError } from './actions';
import { of } from 'rxjs';

export const fetchPokemonListEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    ofType(FETCH_POKEMON_LIST),
    switchMap(() =>
      ajax.getJSON<PokemonPreviewList>(pokemonListUrl).pipe(
        map((response) => fetchSuccess(response)),
        catchError((error: Error) => of(fetchError(error.message)))
      )
    )
  );
