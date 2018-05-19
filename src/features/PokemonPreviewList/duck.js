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
    setPokemon: (state, list) => assoc('list', list, state)
  }
});

export default reducer;
