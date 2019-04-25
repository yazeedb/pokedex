import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store/createStore';
import { Router } from './screens/Router';
import Elm from 'react-elm-components';

export const App = () => {
  return (
    <Provider store={createStore()}>
      <Router />
    </Provider>
  );
};
