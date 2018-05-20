import React from 'react';
import { lifecycle } from 'recompose';

const Component = () => (
  <div />
);

const enhanceComponent = lifecycle({
  componentDidMount() {
    const { fetchPokemonDetails, match: { params } } = this.props;

    fetchPokemonDetails(params.id);
  }
});

export default enhanceComponent(Component);
