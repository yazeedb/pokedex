import React from 'react';
import PropTypes from 'prop-types';
import './StatMeter.scss';

const StatMeter = ({ rating }) => (
  <span className="stat-meter" />
);

StatMeter.propTypes = {
  rating: PropTypes.number
};

export default StatMeter;
