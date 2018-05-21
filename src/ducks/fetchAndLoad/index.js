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
      fetchData: assoc('fetching', true),
      setData: (state, data) => ({
        ...state,
        fetching: false,
        data
      })
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
