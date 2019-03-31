import { ajax } from 'rxjs/ajax';
import { createStore as createReduxStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';

export const createStore = () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { ajax }
  });

  const store = createReduxStore(
    rootReducer,
    applyMiddleware(logger, epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
};
