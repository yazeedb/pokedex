import React from 'react';
import { Route } from 'react-router-dom';
import App from '/features/App';
import PokemonPreviewList from '/features/PokemonPreviewList';
import PokemonDetail from '/features/PokemonDetail';

export default () => (
  <App>
    <Route exact path="/" component={ PokemonPreviewList } />
    <Route exact path="/:id" component={ PokemonDetail } />
  </App>
);
