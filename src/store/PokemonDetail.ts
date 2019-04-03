import { createSlice } from 'redux-starter-kit';
import { FetchStatuses } from './interfaces/FetchStatuses';
import { PokemonDetail } from './interfaces/PokemonDetail';
import { AppEpic } from './rootEpic';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { getPokemonDetails } from '../data/getPokemonDetails';
import { of } from 'rxjs';

export type PokemonDetailState = {
  fetchStatus: FetchStatuses;
  message: string;
  pokemonDetail: PokemonDetail | null;
};

const initialState: PokemonDetailState = {
  fetchStatus: FetchStatuses.fetching,
  message: 'Fetching latest entry!',
  pokemonDetail: null
};

export const { slice, actions, reducer } = createSlice<PokemonDetailState>({
  slice: 'pokemonDetail',
  initialState,
  reducers: {
    fetchPokemonDetail: (state: PokemonDetailState) => state,
    reportSuccess: (state: PokemonDetailState, action) => ({
      ...state,
      fetchStatus: FetchStatuses.success,
      pokemonDetail: action.payload
    }),
    reportError: (state: PokemonDetailState, action) => ({
      ...state,
      fetchStatus: FetchStatuses.error,
      message: action.payload
    })
  }
});

export const fetchPokemonDetailEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType(actions.fetchPokemonDetail.toString()),
    switchMap((action) =>
      getPokemonDetails(action.payload).pipe(map(actions.reportSuccess))
    ),
    catchError((error: Error) => of(actions.reportError(error.message)))
  );
