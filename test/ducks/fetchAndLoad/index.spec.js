import createDuck from '/ducks/fetchAndLoad';

describe('fetchAndLoad', () => {
  it('creates a unique slice', () => {
    const { slice } = createDuck('test');

    expect(slice).toBe('testfetchAndLoad');
  });

  it('provides an overridable initial state', () => {
    const { initial } = createDuck('test', {
      test: 'prop'
    });

    expect(initial).toEqual({
      fetching: false,
      data: null,
      test: 'prop'
    });
  });

  it('has an action to fetch data', () => {
    const { actions, reducer } = createDuck('test');
    const state = reducer(undefined, actions.fetchData());

    expect(state).toEqual({
      fetching: true,
      data: null
    });
  });

  it('has an action to set the data', () => {
    const { actions, reducer } = createDuck('test');
    const state = reducer(undefined, actions.setData([1, 2, 3]));

    expect(state).toEqual({
      fetching: false,
      data: [1, 2, 3]
    });
  });
});
