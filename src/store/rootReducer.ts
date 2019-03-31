import { combineReducers } from 'redux';
import * as pokemonPreviewList from './PokemonPreviewList/reducer';
import { PokemonListState } from './PokemonPreviewList/types';
import * as title from './AppTitle';

export type RootState = {
  pokemonPreviewList: PokemonListState;
  title: title.TitleState;
};

export const rootReducer = combineReducers({
  pokemonPreviewList: pokemonPreviewList.reducer,
  title: title.reducer
});
