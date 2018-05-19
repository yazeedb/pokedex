import autodux from 'autodux';
import { assoc } from 'ramda';

export const {
  actions: { fetchPokemon, setPokemon },
  reducer,
  selectors
} = autodux({
  slice: 'pokemonPreviewList',
  initial: {
    fetching: false,
    list: []
  },
  actions: {
    fetchPokemon: assoc('fetching', true),
    setPokemon: (state, list) => ({
      ...state,
      fetching: false,
      list
    })
  }
});

export default reducer;
