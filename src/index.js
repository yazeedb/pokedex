import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import isBrowser from '/helpers/isBrowser';
import store from './store';
import Routes from './Routes';
import './app.scss';

const App = (Router, props = {}) => () => (
  <Provider store={ store }>
    <Router { ...props }>
      <Routes />
    </Router>
  </Provider>
);

const BrowserApp = App(BrowserRouter);

if (isBrowser()) {
  const clientContent = document.getElementById('client-content');
  const serverContent = document.getElementById('server-content');

  hydrate(
    <BrowserApp />,
    clientContent,
    () => document.body.removeChild(serverContent)
  );
}


export default App;
