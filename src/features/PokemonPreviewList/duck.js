import createDuck from '/ducks/fetchAndLoad';
import endpoints from '/endpoints';

const duck = createDuck('pokemonPreviewList', { data: [] });
const { pokedex } = endpoints();

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
