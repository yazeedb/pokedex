import autodux from 'autodux';
import { assoc, identity } from 'ramda';
import { makeFetchDataEpic } from './epics';

export default (sliceName, initial = {}) => {
  const duck = autodux({
    slice: `${sliceName}fetchAndLoad`,
    initial: {
      fetching: false,
      data: null,
      ...initial
    },
    actions: {
      fetchData: assoc('fetching', true)
    },
    selectors: {
      getState: identity
    }
  });

  return {
    ...duck,
    makeFetchDataEpic
  };
};
