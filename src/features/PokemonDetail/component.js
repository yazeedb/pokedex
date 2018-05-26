import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import { head, pipe, prop } from 'ramda';
import TypeBadge from '/components/TypeBadge';
import getFlavorTextEntries from '/helpers/getFlavorTextEntries';
import upperFirst from '/helpers/upperFirst';
import findEnglishGenus from './findEnglishGenus';
import './PokemonDetail.scss';

const Loading = () => <span data-test="loading">Loading...</span>;
const Component = ({
  data: { details, species },
  fetching
}) => (fetching ? <Loading /> : (
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
      details.types.map(({ type }) => (
        <TypeBadge type={ type.name } key={ type.name } />
      ))
    }

    <p data-test="flavor-text-entry">
      {
        pipe(
          getFlavorTextEntries,
          head,
          prop('flavor_text')
        )(species.flavor_text_entries)
      }
    </p>

    <div className="egg-groups" data-test="egg-groups">
      <h3 data-test="title">EGG GROUPS</h3>
      <span data-test="egg-group-text">
        {
          species.egg_groups
            .map(prop('name'))
            .map(upperFirst)
            .join(', ')
      }
      </span>
    </div>
  </div>
));

Component.propTypes = {
  data: PropTypes.shape({
    details: PropTypes.object,
    species: PropTypes.object
  }),
  fetching: PropTypes.bool
};

const enhanceComponent = lifecycle({
  componentDidMount() {
    const { fetchPokemonDetails, match: { params } } = this.props;

    fetchPokemonDetails(params.id);
  }
});

export default enhanceComponent(Component);
