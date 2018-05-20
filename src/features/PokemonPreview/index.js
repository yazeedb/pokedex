import React from 'react';
import PropTypes from 'prop-types';
import TypeBadge from '/components/TypeBadge';
import upperFirst from '/helpers/upperFirst';

const PokemonPreview = ({
  name,
  spriteUrl,
  types
}) => (
  <div>
    <img
      src={ spriteUrl }
      alt={ name }
      data-test="sprite"
    />

    <span data-test="name">
      { upperFirst(name) }
    </span>

    { types.map(type => <TypeBadge type={ type } key={ type } />) }
  </div>
);

PokemonPreview.propTypes = {
  name: PropTypes.string,
  spriteUrl: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string)
};

export default PokemonPreview;
