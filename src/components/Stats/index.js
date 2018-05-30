import React from 'react';
import PropTypes from 'prop-types';
import { pipe, pluck, sum } from 'ramda';
import StatMeter from '/components/StatMeter';
import { statNamesMap } from './constants';
import './Stats.scss';

const sumBaseStats = pipe(pluck('base_stat'), sum);

const Stats = ({ stats }) => (
  <div className="stats">
    {
      stats.map(({ base_stat, stat }) => (
        <div className="stat-container" key={ stat.name }>
          <span className="stat-name" data-test="stat-name">
            { statNamesMap[stat.name] }
          </span>

          <b className="stat-point" data-test="stat-point">
            { base_stat }
          </b>

          <StatMeter rating={ base_stat } />
        </div>
      ))
    }

    <p className="total" data-test="total">
      TOTAL <b>{ sumBaseStats(stats) }</b>
    </p>
  </div>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object)
};

export default Stats;
