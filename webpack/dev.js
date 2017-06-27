const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      disable: true
    })
  ]
};
