import React from 'react';
import PropTypes from 'prop-types';
import { add, pipe, pluck, reduce } from 'ramda';
import { statNameMap } from './constants';

const getTotal = pipe(pluck('base_stat'), reduce(add, 0));

const Stats = ({ stats }) => (
  <div className="stats">
    {
      [...stats].map(({ base_stat, stat }) => (
        <div key={ stat.name }>
          <span data-test="stat-name">
            { statNameMap[stat.name.toUpperCase()] }
          </span>

          <span data-test="stat-point">
            { base_stat }
          </span>
        </div>
      ))
    }

    <span data-test="total">
      TOTAL { getTotal(stats) }
    </span>
  </div>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object)
};

export default Stats;
