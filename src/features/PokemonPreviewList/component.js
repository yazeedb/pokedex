import React from 'react';
import PropTypes from 'prop-types';
import PokemonPreview from '/features/PokemonPreview';
import doOnServer from '/components/doOnServer';

const Loading = () => <span data-test="loading">Loading...</span>;
const Component = ({ fetching, data }) => (
  <div className="pokemon-preview-list">
    { console.log('my data:', data) }
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

const enhanceComponent = doOnServer(({ fetchPokemon, setTitle }) => {
  fetchPokemon();
  setTitle('ALL POKEMON');
});

export default enhanceComponent(Component);
