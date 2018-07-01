import createDuck from '/ducks/fetchAndLoad';
import { pokedex } from '/endpoints';
import skeletonData from './skeletonData';

const duck = createDuck('pokemonPreviewList', { data: skeletonData });

export const {
  actions: {
    fetchData: fetchPokemon,
    setData: setPokemon
  },
  selectors,
  slice,
  reducer
} = duck;

export const fetchDataEpic = duck.makeFetchDataEpic({
  type: fetchPokemon.type,
  endpoint: pokedex,
  successActions: [setPokemon]
});

export default reducer;
