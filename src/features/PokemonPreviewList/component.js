import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import PokemonPreview from '/features/PokemonPreview';

const Component = ({ fetching, data }) => (
  <div className="pokemon-preview-list">
    {
        data.map(({ id, name, types }) => (
          <PokemonPreview
            id={ id }
            name={ name }
            types={ types }
            spriteUrl={ `pokemon/icons/${id}.png` }
            fetching={ fetching }
            key={ id }
          />
        ))
      }
  </div>
);

Component.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  fetching: PropTypes.bool
};

const enhanceComponent = lifecycle({
  componentDidMount() {
    const { fetchPokemon, setTitle } = this.props;

    fetchPokemon();
    setTitle('ALL POKEMON');
  }
});

export default enhanceComponent(Component);
