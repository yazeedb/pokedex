import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store/createStore';
import { Router } from './screens/Router';

export const App = () => {
  return (
    <Provider store={createStore()}>
      <Router />
    </Provider>
  );
};
