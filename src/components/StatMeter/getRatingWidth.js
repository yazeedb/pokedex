import { pipe } from 'ramda';
import { maxStat } from './constants';

export default pipe(
  (rating, { offsetWidth }) => (rating / maxStat) * offsetWidth,
  result => result.toFixed(2),
  parseFloat
);
