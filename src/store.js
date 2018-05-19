import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootEpic from '/epics/root';
import rootReducer from '/ducks/root';

export default createStore(
  rootReducer,
  applyMiddleware(
    rootEpic,
    logger
  )
);
