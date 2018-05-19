import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';

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

export default enhanceComponent(Component);
