import autodux from 'autodux';

export const {
  actions,
  reducer,
  selectors,
  slice
} = autodux({
  slice: 'title',
  initial: { title: 'Pokemon' }
});
