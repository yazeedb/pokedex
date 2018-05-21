import { combineReducers } from 'redux';
import * as pokemonPreviewList from '/features/PokemonPreviewList/duck';
import * as pokemonDetails from '/features/PokemonDetail/duck';

export default combineReducers({
  [pokemonPreviewList.slice]: pokemonPreviewList.reducer,
  [pokemonDetails.slice]: pokemonDetails.reducer
});
