import { createSlice } from 'redux-starter-kit';
import { AppEpic } from './rootEpic';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { pokemonListUrl } from '../constants';
import { of } from 'rxjs';

export enum FetchStatuses {
  fetching = 'fetching',
  error = 'error',
  success = 'success'
}

export type PokemonPreview = {
  id: number;
  name: string;
  types: string[];
};

export type PokemonPreviewList = PokemonPreview[];

export type PokemonListState = {
  pokemonPreviewList: PokemonPreviewList;
  fetchStatus: FetchStatuses;
  message: string;
  searchValue: string;
};

const initialState: PokemonListState = {
  pokemonPreviewList: [],
  fetchStatus: FetchStatuses.fetching,
  message: "Gotta fetch 'em all!",
  searchValue: ''
};

export const { slice, actions, reducer } = createSlice<PokemonListState>({
  initialState: initialState,
  reducers: {
    fetchError: (state, action) => ({
      ...state,
      fetchStatus: FetchStatuses.error,
      message: action.payload
    }),
    fetchSuccess: (state, action) => ({
      ...state,
      pokemonPreviewList: action.payload,
      fetchStatus: FetchStatuses.success
    }),
    changeSearchValue: (state, action) => ({
      ...state,
      searchValue: action.payload
    }),
    fetchPokemonList: (state) => state
  }
});

export const fetchPokemonListEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    ofType(actions.fetchPokemonList.toString()),
    switchMap(() =>
      ajax.getJSON<PokemonPreviewList>(pokemonListUrl).pipe(
        map((response) => actions.fetchSuccess(response)),
        catchError((error: Error) => of(actions.fetchError(error.message)))
      )
    )
  );
