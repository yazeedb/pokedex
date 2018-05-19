import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from '/ducks/root';

export default createStore(rootReducer, applyMiddleware(logger));
