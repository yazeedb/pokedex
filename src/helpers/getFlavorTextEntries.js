import { filter, pathEq } from 'ramda';

module.exports = filter(pathEq(['language', 'name'], 'en'));
