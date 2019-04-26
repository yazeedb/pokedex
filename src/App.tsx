import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store/createStore';
import { Router } from './screens/Router';
import Elm from 'react-elm-components';
import { Buttons } from './elm/Buttons.elm';

console.log({ Buttons });

export const App = () => {
  return (
    <Provider store={createStore()}>
      <Router />
    </Provider>
  );
};
