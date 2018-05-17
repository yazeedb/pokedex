import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes';
import './global.scss';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

render(
  <App />,
  document.getElementById('root'),
);
