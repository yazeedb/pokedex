import autodux from 'autodux';
import { assoc } from 'ramda';
import { fetchDataEpic } from './epics';

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
    }
  });

  return {
    ...duck,
    epics: { fetchDataEpic }
  };
};
