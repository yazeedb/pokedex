import React from 'react';
import PropTypes from 'prop-types';
import { pipe, pluck, sum } from 'ramda';
import { statNamesMap } from './constants';
import './Stats.scss';

const sumBaseStats = pipe(pluck('base_stat'), sum);

const Stats = ({ stats }) => (
  <div className="stats">
    {
      stats.map(({ base_stat, stat }) => (
        <div key={ stat.name }>
          <span className="stat-name" data-test="stat-name">
            { statNamesMap[stat.name] }
          </span>

          <b className="stat-point" data-test="stat-point">
            { base_stat }
          </b>
        </div>
      ))
    }

    <span data-test="total">
      TOTAL <b>{ sumBaseStats(stats) }</b>
    </span>
  </div>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object)
};

export default Stats;
