import React from 'react';
import { lifecycle } from 'recompose';

const PokemonDetail = () => (
  <div />
);

const enhanceComponent = lifecycle({
  componentDidMount() {
    const { fetchPokemonDetails, id } = this.props;

    fetchPokemonDetails(id);
  }
});

export default enhanceComponent(PokemonDetail);
