import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Elm from 'react-elm-components';
import { PokemonPreviewList } from './PokemonPreviewList';
import { AppBar } from './shared/AppBar';
import { PokemonDetail } from './PokemonDetail';
import Buttons from './Buttons.elm';
import { Page404 } from './Page404';

const ElmButton = (props: any) => <Elm src={Buttons.Elm.Buttons} {...props} />;

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PokemonPreviewList} />
      <Route exact path="/pokemon/:id" component={PokemonDetail} />
      <Route exact path="/elm" component={ElmButton} />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
);
