import React from 'react';
import { lifecycle } from 'recompose';

const Component = () => (
  <div className="pokemon-preview-list">
    PokemonPreviewList page
  </div>
);

const enhanceComponent = lifecycle({
  componentDidMount() {
    this.props.fetchPokemon();
  }
});

export const PokemonPreviewList = enhanceComponent(Component);

// TODO: Add Redux to default export
export default PokemonPreviewList;
