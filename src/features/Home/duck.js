import autodux from 'autodux';

export const { actions, reducer, selectors } = autodux({
  slice: 'pokemon',
  initial: [],
  actions: {
    setPokemon: (state, payload) => payload
  }
});

export default reducer;
