import createDuck from '/ducks/fetchAndLoad';
import { pokedex } from '/endpoints';

const duck = createDuck('pokemonPreviewList', { data: [] });

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
