import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '/features/App';
import PokemonPreviewList from '/features/PokemonPreviewList';

export default () => (
  <BrowserRouter>
    <App>
      <Route exact path="/" component={ PokemonPreviewList } />
    </App>
  </BrowserRouter>
);
