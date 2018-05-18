import React from 'react';
import PropTypes from 'prop-types';
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

    { JSON.stringify(types) }
  </div>
);

PokemonPreview.propTypes = {
  name: PropTypes.string,
  spriteUrl: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string)
};

export default PokemonPreview;
