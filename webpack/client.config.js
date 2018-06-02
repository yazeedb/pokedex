const { root } = require('./helpers');

module.exports = {
  entry: '/index',
  output: {
    path: root('dist/client')
  }
};
