import autodux from 'autodux';

export const { actions, reducer, selectors } = autodux({
  slice: 'pokemon',
  initial: {
    fetching: false,
    list: []
  },
  actions: {
    setPokemon: (state, list) => ({
      ...state,
      list
    })
  }
});

export default reducer;
