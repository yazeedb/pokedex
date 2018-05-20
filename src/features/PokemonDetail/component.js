import React from 'react';
import { lifecycle } from 'recompose';

const PokemonDetail = () => (
  <div />
);

const enhanceComponent = lifecycle({
  componentDidMount() {
    this.props.fetchPokemonDetails();
  }
});

export default enhanceComponent(PokemonDetail);
