import autodux from 'autodux';
import epics from './epics';

export default (sliceName, initial = {}) => autodux({
  slice: `${sliceName}fetchAndLoad`,
  initial: {
    fetching: false,
    data: null,
    ...initial
  },
  epics
});
