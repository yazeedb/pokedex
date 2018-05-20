import autodux from 'autodux';

export const {
  actions,
  reducer,
  selectors
} = autodux({
  slice: 'pokemonDetail',
  initial: {
    loading: false,
    pokemon: null
  }
});
