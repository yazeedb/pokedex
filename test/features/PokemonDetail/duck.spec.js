import { reducer } from '/features/PokemonDetail/duck';

describe('duck', () => {
  it('has the correct initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      loading: false,
      pokemon: null
    });
  });
});
