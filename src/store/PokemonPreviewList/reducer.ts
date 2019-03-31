import {
  PokemonListState,
  PokemonListActionTypes,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FetchStatuses,
  CHANGE_SEARCH_VALUE
} from './types';

const initialState: PokemonListState = {
  pokemonPreviewList: [],
  fetchStatus: FetchStatuses.fetching,
  message: '',
  searchValue: ''
};

export const reducer = (
  state = initialState,
  action: PokemonListActionTypes
): PokemonListState => {
  switch (action.type) {
    case FETCH_ERROR:
      return {
        ...state,
        fetchStatus: FetchStatuses.error,
        message: action.payload
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        fetchStatus: FetchStatuses.success,
        pokemonPreviewList: action.payload
      };

    case CHANGE_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload
      };

    default:
      return state;
  }
};
