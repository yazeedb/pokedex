import {
  fetchPokemonDetails,
  setPokemonDetails,
  reducer
} from '/features/PokemonDetail/duck';

describe('duck', () => {
  it('has the correct initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      fetching: false,
      pokemon: null
    });
  });

  describe('fetchPokemonDetails action', () => {
    it('results in the correct state', () => {
      const action = fetchPokemonDetails();
      const state = reducer(undefined, action);

      expect(state).toEqual({
        fetching: true,
        pokemon: null
      });
    });
  });

  describe('setPokemonDetails action', () => {
    it('results in the correct state', () => {
      const action = setPokemonDetails({ name: 'Charmander' });
      const state = reducer(undefined, action);

      expect(state).toEqual({
        fetching: false,
        pokemon: { name: 'Charmander' }
      });
    });
  });
});
