const { root } = require('./helpers');

module.exports = {
  entry: root('server'),
  output: {
    path: root('dist/server')
  },
  target: 'node',
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};
