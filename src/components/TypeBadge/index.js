import React from 'react';
import PropTypes from 'prop-types';
import './TypeBadge.scss';

const TypeBadge = ({ type }) => (
  <span
    data-test="type"
    className={ `type-badge type-${type.toLowerCase()}` }
  >
    { type.toUpperCase() }
  </span>
);

TypeBadge.propTypes = {
  type: PropTypes.string
};

export default TypeBadge;
