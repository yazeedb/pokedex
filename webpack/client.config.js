const { root } = require('./helpers');

module.exports = {
  output: {
    path: root('dist'),
    filename: 'bundle.js'
  },
  entry: root('src/index')
};
