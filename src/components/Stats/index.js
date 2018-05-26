import React from 'react';
import PropTypes from 'prop-types';
import { pipe, pluck, sum } from 'ramda';
import { statNamesMap } from './constants';

const sumBaseStats = pipe(pluck('base_stat'), sum);

const Stats = ({ stats }) => (
  <div className="stats">
    {
      stats.map(({ base_stat, stat }) => (
        <div key={ stat.name }>
          <span data-test="stat-name">
            { statNamesMap[stat.name] }
          </span>

          <span data-test="stat-point">
            { base_stat }
          </span>
        </div>
      ))
    }

    <span data-test="total">
      TOTAL { sumBaseStats(stats) }
    </span>
  </div>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object)
};

export default Stats;
