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
    it('sets the list and resets fetching', () => {
      const action = setPokemon(['Bulbasaur']);
      const state = reducer({
        fetching: true,
        list: []
      }, action);

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
