import { actions, reducer } from '/ducks/title';

describe('title', () => {
  it('has the correct initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toBe('Pokemon');
  });

  it('allows changing the title', () => {
    const action = actions.setTitle('Test');
    const state = reducer(undefined, action);

    expect(state).toBe('Test');
  });
});
