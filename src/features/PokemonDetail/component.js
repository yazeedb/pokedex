import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import TypeBadge from '/components/TypeBadge';
import upperFirst from '/helpers/upperFirst';
import findEnglishGenus from './findEnglishGenus';
import './PokemonDetail.scss';

const Component = ({
  data: { details, species }
}) => (
  <div className="pokemon-detail">
    <img
      src={ `pokemon/sugimori/${details.id}.png` }
      alt={ details.name }
      className="sugimori-img"
      data-test="sugimori-img"
    />

    <h1 className="name" data-test="name">
      { upperFirst(details.name) }
    </h1>

    <p className="id-genus" data-test="id-genus">
      #{ details.id } { findEnglishGenus(species) }
    </p>

    {
      details.types && details.types.map(({ type }) => (
        <TypeBadge type={ type.name } key={ type.name } />
      ))
    }
  </div>
);

Component.propTypes = {
  data: PropTypes.shape({
    details: PropTypes.object,
    species: PropTypes.object
  })
};

const enhanceComponent = lifecycle({
  componentDidMount() {
    const { fetchPokemonDetails, match: { params } } = this.props;

    fetchPokemonDetails(params.id);
  }
});

export default enhanceComponent(Component);
