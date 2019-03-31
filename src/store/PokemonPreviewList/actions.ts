import {
  FETCH_POKEMON_LIST,
  CHANGE_SEARCH_VALUE,
  FETCH_ERROR,
  FETCH_SUCCESS,
  PokemonPreviewList,
  FetchPokemonAction,
  FetchErrorAction,
  FetchSuccessAction,
  ChangeSearchValueAction
} from './types';

export const fetchPokemonList = (): FetchPokemonAction => ({
  type: FETCH_POKEMON_LIST
});

export const fetchError = (error: string): FetchErrorAction => ({
  type: FETCH_ERROR,
  payload: error
});

export const fetchSuccess = (list: PokemonPreviewList): FetchSuccessAction => ({
  type: FETCH_SUCCESS,
  payload: list
});

export const changeSearchValue = (
  newValue: string
): ChangeSearchValueAction => ({
  type: CHANGE_SEARCH_VALUE,
  payload: newValue
});
