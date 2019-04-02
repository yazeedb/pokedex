import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PokemonPreviewList } from './PokemonPreviewList';
import { AppBar } from './shared/AppBar';
import { PokemonDetail } from './PokemonDetail';
import { Page404 } from './Page404';

export const Router = () => (
  <BrowserRouter>
    <AppBar />
    <Switch>
      <Route exact path="/" component={PokemonPreviewList} />
      <Route exact path="/pokemon/:id" component={PokemonDetail} />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
);
