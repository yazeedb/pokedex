import autodux from 'autodux';

export const { actions, reducer } = autodux({
  slice: 'title',
  initial: 'Pokemon',
  actions: {
    setTitle: (state, payload) => payload
  }
});
