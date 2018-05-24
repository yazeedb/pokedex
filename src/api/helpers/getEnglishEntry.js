const { find, pathEq } = require('ramda');

module.exports = find(pathEq(['language', 'name'], 'en'));
