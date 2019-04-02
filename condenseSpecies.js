const { pathEq } = require('ramda');

const isEnglishName = pathEq(['language', 'name'], 'en');

module.exports = ({ flavor_text_entries, genera, names, ...other }) => ({
  ...other,
  genus: genera.find(isEnglishName).genus,
  flavor_text: flavor_text_entries.find(isEnglishName).flavor_text
});
