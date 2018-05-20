import autodux from 'autodux';
import { assoc } from 'ramda';

export const {
  actions: { fetchPokemonDetails, setPokemonDetails },
  reducer,
  selectors
} = autodux({
  slice: 'pokemonDetail',
  initial: {
    fetching: false,
    pokemon: null
  },
  actions: {
    fetchPokemonDetails: assoc('fetching', true),
    setPokemonDetails: (state, pokemon) => ({
      fetching: false,
      pokemon
    })
  }
});

export default reducer;
