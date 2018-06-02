const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { root } = require('./helpers');

module.exports = {
  output: { filename: 'bundle.js' },
  resolve: {
    extensions: ['.js'],
    alias: {
      '': root('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.png/,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  plugins: [new ExtractTextPlugin({ filename: '[name].css' })]
};
