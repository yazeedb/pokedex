import { actions, reducer } from 'features/Home/duck';

describe('duck', () => {
  it('has the correct initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual([]);
  });

  it('allows setting the entire state', () => {
    const action = actions.setPokemon(['Bulbasaur']);
    const state = reducer(undefined, action);

    expect(state).toEqual(['Bulbasaur']);
  });
});
