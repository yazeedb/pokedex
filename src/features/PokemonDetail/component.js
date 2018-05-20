import React from 'react';
import { lifecycle } from 'recompose';

const PokemonDetail = (props) => (
  <div>
    { console.log('props:', props) }
  </div>
);

const enhanceComponent = lifecycle({
  componentDidMount() {
    const { fetchPokemonDetails, match: { params } } = this.props;

    fetchPokemonDetails(params.id);
  }
});

export default enhanceComponent(PokemonDetail);
