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

export const FETCH_POKEMON_LIST = `FETCH_POKEMON_LIST`;
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_SUCCESS = `FETCH_SUCCESS`;
export const CHANGE_SEARCH_VALUE = `CHANGE_SEARCH_VALUE`;

export type FetchPokemonAction = {
  type: typeof FETCH_POKEMON_LIST;
};

export type FetchErrorAction = {
  type: typeof FETCH_ERROR;
  payload: string;
};

export type FetchSuccessAction = {
  type: typeof FETCH_SUCCESS;
  payload: PokemonPreviewList;
};

export type ChangeSearchValueAction = {
  type: typeof CHANGE_SEARCH_VALUE;
  payload: string;
};

export type PokemonListActionTypes =
  | FetchPokemonAction
  | FetchErrorAction
  | FetchSuccessAction
  | ChangeSearchValueAction;
