import React from 'react';
import PropTypes from 'prop-types';
import { statNameMap } from './constants';

const Stats = ({ stats }) => (
  <div className="stats">
    {
      [...stats]
        .reverse()
        .map(({ stat }) => (
          <span key={ stat.name } data-test="stat-name">
            { statNameMap[stat.name.toUpperCase()] }
          </span>
        ))
    }
  </div>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object)
};

export default Stats;
