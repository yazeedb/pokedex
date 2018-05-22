import { find, pathEq, pipe, propOr } from 'ramda';

export default pipe(
  propOr([], 'genera'),
  find(pathEq(['language', 'name'], 'en')),
  propOr('', 'genus')
);
