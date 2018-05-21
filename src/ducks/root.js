import { combineReducers } from 'redux';
import pokemonPreviewList, { slice } from '/features/PokemonPreviewList/duck';

export default combineReducers({
  [slice]: pokemonPreviewList
});
