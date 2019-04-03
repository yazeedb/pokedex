import { combineReducers } from 'redux';
import * as pokemonPreviewList from './PokemonPreviewList';
import * as pokemonDetail from './PokemonDetail';
import * as title from './AppTitle';

export type RootState = {
  pokemonPreviewList: pokemonPreviewList.PokemonListState;
  title: title.TitleState;
  pokemonDetail: pokemonDetail.PokemonDetailState;
};

export const rootReducer = combineReducers({
  pokemonPreviewList: pokemonPreviewList.reducer,
  title: title.reducer,
  pokemonDetail: pokemonDetail.reducer
});
