import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import isBrowser from '/helpers/isBrowser';
import Routes from './Routes';
import getStore from './store';
import './app.scss';

const App = ({
  store,
  Router,
  props = {}
}) => () => (
  <Provider store={ store }>
    <Router { ...props }>
      <Routes />
    </Router>
  </Provider>
);

if (isBrowser()) {
  const clientContent = document.getElementById('client-content');
  const serverContent = document.getElementById('server-content');

  const preloadedState = window.PRELOADED_STATE;
  delete window.PRELOADED_STATE;
  const store = getStore(preloadedState);

  console.log('transferring this state:', preloadedState);

  const BrowserApp = App({
    store,
    Router: BrowserRouter
  });

  render(
    <BrowserApp />,
    clientContent,
    () => document.body.removeChild(serverContent)
  );
}

export default App;
