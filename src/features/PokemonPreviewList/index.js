import React from 'react';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { fetchPokemon, selectors } from './duck';

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
export const mapStateToProps = selectors.getPokemonPreviewList;

const withConnect = connect(mapStateToProps, { fetchPokemon });

export default withConnect(PokemonPreviewList);
