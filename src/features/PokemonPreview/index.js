import React from 'react';
import PropTypes from 'prop-types';
import TypeBadge from '/components/TypeBadge';
import upperFirst from '/helpers/upperFirst';
import './PokemonPreview.scss';

const PokemonPreview = ({
  name,
  spriteUrl,
  types
}) => (
  <div className="pokemon-preview">
    <div className="sprite-name-wrapper">
      <img
        src={ spriteUrl }
        alt={ name }
        data-test="sprite"
      />

      <span className="name" data-test="name">
        { upperFirst(name) }
      </span>
    </div>

    <span className="types">
      { types.map(type => <TypeBadge type={ type } key={ type } />) }
    </span>
  </div>
);

PokemonPreview.propTypes = {
  name: PropTypes.string,
  spriteUrl: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string)
};

export default PokemonPreview;
