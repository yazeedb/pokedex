import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '/features/App';
import Home from '/features/Home';

export default () => (
  <BrowserRouter>
    <App>
      <Route exact path="/" component={Home} />
    </App>
  </BrowserRouter>
);
