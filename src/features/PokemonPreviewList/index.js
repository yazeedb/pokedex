import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { fetchPokemon, selectors } from './duck';

const Loading = () => <span data-test="loading">Loading...</span>;
const Component = ({ fetching, list }) => (
  <div className="pokemon-preview-list">
    { fetching ? <Loading /> : list }
  </div>
);

Component.propTypes = {
  fetching: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object)
};

const enhanceComponent = lifecycle({
  componentDidMount() {
    this.props.fetchPokemon();
  }
});

export const PokemonPreviewList = enhanceComponent(Component);
export const mapStateToProps = selectors.getPokemonPreviewList;

const withConnect = connect(mapStateToProps, { fetchPokemon });

export default withConnect(PokemonPreviewList);
