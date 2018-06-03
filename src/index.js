import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
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

// render(
//   <BrowserApp />,
//   document.getElementById('root'),
// );

export default App;
