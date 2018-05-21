import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import PokemonPreview from '/features/PokemonPreview';

const Loading = () => <span data-test="loading">Loading...</span>;
const Component = ({ fetching, data }) => (
  <div className="pokemon-preview-list">
    {
      fetching ? <Loading /> :
        data.map(({ id, name, types }) => (
          <PokemonPreview
            id={ id }
            name={ name }
            types={ types }
            spriteUrl={ `pokemon/icons/${id}.png` }
            key={ id }
          />
        ))
      }
  </div>
);

Component.propTypes = {
  fetching: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object)
};

const enhanceComponent = lifecycle({
  componentDidMount() {
    this.props.fetchPokemon();
  }
});

export default enhanceComponent(Component);
