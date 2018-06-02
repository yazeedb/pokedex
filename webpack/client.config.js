const { root } = require('./helpers');

module.exports = {
  entry: root('src/index'),
  output: {
    path: root('dist/client')
  }
};
