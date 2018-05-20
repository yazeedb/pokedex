import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TypeBadge from '/components/TypeBadge';
import upperFirst from '/helpers/upperFirst';
import './PokemonPreview.scss';

const PokemonPreview = ({
  id,
  name,
  spriteUrl,
  types
}) => (
  <Link
    to={ `/detail/${id}` }
    className="pokemon-preview"
    data-test="detail-link"
  >
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
  </Link>
);

PokemonPreview.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  spriteUrl: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string)
};

export default PokemonPreview;
