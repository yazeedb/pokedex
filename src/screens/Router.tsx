import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PokemonPreviewList } from './PokemonPreviewList';
import { AppBar } from './shared/AppBar';

export const Router = () => (
  <BrowserRouter>
    <AppBar />
    <Switch>
      <Route exact path="/" component={PokemonPreviewList} />
      <Route path="*" component={() => <div>404, not found!</div>} />
    </Switch>
  </BrowserRouter>
);
