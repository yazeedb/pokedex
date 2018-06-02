const webpackMerge = require('webpack-merge');
const common = require('./webpack/common.config');
const client = require('./webpack/client.config');
const server = require('./webpack/server.config');

module.exports = [
  webpackMerge({}, common, client),
  webpackMerge({}, common, server)
];
