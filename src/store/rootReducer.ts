import { combineReducers } from 'redux';
import * as pokemonPreviewList from './PokemonPreviewList';
import * as title from './AppTitle';

export type RootState = {
  pokemonPreviewList: pokemonPreviewList.PokemonListState;
  title: title.TitleState;
};

export const rootReducer = combineReducers({
  pokemonPreviewList: pokemonPreviewList.reducer,
  title: title.reducer
});
