import createDuck from '/ducks/fetchAndLoad';
import { pokedex } from '/endpoints';

const duck = createDuck('pokemonPreviewList', { list: [] });

export const {
  actions: {
    fetchData: fetchPokemon,
    setList: setPokemon,
    setFetching
  },
  selectors,
  slice,
  reducer
} = duck;

export const fetchDataEpic = duck.makeFetchDataEpic({
  type: fetchPokemon.type,
  endpoint: pokedex,
  successActions: [setPokemon, setFetching.bind(null, false)]
});

export default reducer;
