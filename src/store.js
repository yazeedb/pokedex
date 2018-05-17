import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '/ducks/root';

export default createStore(rootReducer, applyMiddleware(thunk));
