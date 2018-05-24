const {
  evolve,
  map,
  pipe,
  prop
} = require('ramda');
const getEnglishEntry = require('./getEnglishEntry');

const getName = prop('name');

module.exports = evolve({
  color: getName,
  egg_groups: map(getName),
  evolves_from_species: getName,
  flavor_text_entries: pipe(getEnglishEntry, prop('flavor_text')),
  genera: pipe(getEnglishEntry, prop('genus')),
  habitat: getName,
  generation: getName,
  growth_rate: getName,
  shape: getName
});
