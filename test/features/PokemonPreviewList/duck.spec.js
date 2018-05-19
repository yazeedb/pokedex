import {
  setPokemon,
  fetchPokemon,
  reducer
} from 'features/PokemonPreviewList/duck';

describe('duck', () => {
  it('has the correct initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      fetching: false,
      list: []
    });
  });

  describe('setPokemon action', () => {
    it('allows setting the entire state', () => {
      const action = setPokemon(['Bulbasaur']);
      const state = reducer(undefined, action);

      expect(state).toEqual({
        fetching: false,
        list: ['Bulbasaur']
      });
    });
  });

  describe('fetchPokemon action', () => {
    it('sets the fetching to true', () => {
      const action = fetchPokemon();
      const state = reducer(undefined, action);

      expect(state).toEqual({
        fetching: true,
        list: []
      });
    });
  });
});
