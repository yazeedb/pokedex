const path = require('path');
const webpackMerge = require('webpack-merge');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');

const { NoEmitOnErrorsPlugin, LoaderOptionsPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ['inline', 'polyfills', 'sw-register', 'styles','vendor','main'];
const baseHref = '';
const deployUrl = '';


module.exports = (options) => {
  options = options || {};

  const commonConfig = {
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['./node_modules']
    },
    resolveLoader: {
      modules: ['./node_modules']
    },
    entry: {
      main: ['./src/main.ts'],
      polyfills: ['./src/polyfills.ts'],
      styles: ['./src/styles.scss']
    },
    output: {
      path: path.join(process.cwd(), 'dist')
    },
    module: {
      rules: [
        {
          "enforce": "pre",
          "test": /\.js$/,
          "loader": "source-map-loader",
          "exclude": [
            /\/node_modules\//
          ]
        },
        { test: /\.html$/, use: 'raw-loader' },
        { test: /\.(eot|svg)$/, loader: 'file-loader?name=[name].[hash:20].[ext]' },
        {
          "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
          "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
        },
        {
          exclude: [path.join(process.cwd(), 'src/styles.scss')],
          test: /\.scss$/,
          loaders: [
            'exports-loader?module.exports.toString()',
            'css-loader?{\'sourceMap\': false, \'importLoaders\':1}',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          "include": [path.join(process.cwd(), "src/styles.scss")],
          "test": /\.scss$/,
          "loaders": ExtractTextPlugin.extract({
            "use": [
              "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
              "postcss-loader",
              "sass-loader"
            ],
            "fallback": "style-loader",
            "publicPath": ""
          })
        },
        {
          "test": /\.ts$/,
          "loader": "@ngtools/webpack"
        }
      ]
    },
    plugins: [
      new BaseHrefWebpackPlugin({}),
      new CommonsChunkPlugin({
        "name": "inline",
        "minChunks": null
      }),
      new CommonsChunkPlugin({
        "name": "vendor",
        "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
        "chunks": [
          "main"
        ]
      }),
      new NoEmitOnErrorsPlugin(),
      new GlobCopyWebpackPlugin({
        "patterns": [
          "assets",
          "favicon.ico"
        ],
        "globOptions": {
          "cwd": "/Users/yazeed/Desktop/projects/pokedex/src",
          "dot": true,
          "ignore": "**/.gitkeep"
        }
      }),
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        "template": "./src/index.html",
        "filename": "./index.html",
        "hash": false,
        "inject": true,
        "compile": true,
        "favicon": false,
        "minify": false,
        "cache": true,
        "showErrors": true,
        "chunks": "all",
        "excludeChunks": [],
        "title": "Webpack App",
        "xhtml": true,
        "chunksSortMode": function sort(left, right) {
          let leftIndex = entryPoints.indexOf(left.names[0]);
          let rightindex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
            return 1;
          }
          else if (leftIndex < rightindex) {
            return -1;
          }
          else {
            return 0;
          }
        }
      }),
      new LoaderOptionsPlugin({
        "sourceMap": false,
        "options": {
          "postcss": [
            autoprefixer(),
            postcssUrl({"url": (URL) => {
              // Only convert root relative URLs, which CSS-Loader won't process into require().
              if (!URL.startsWith('/') || URL.startsWith('//')) {
                return URL;
              }
              if (deployUrl.match(/:\/\//)) {
                // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                return `${deployUrl.replace(/\/$/, '')}${URL}`;
              }
              else if (baseHref.match(/:\/\//)) {
                // If baseHref contains a scheme, include it as is.
                return baseHref.replace(/\/$/, '') +
                `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
              }
              else {
                // Join together base-href, deploy-url and the original URL.
                // Also dedupe multiple slashes into single ones.
                return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
              }
            }}),
            cssnano({ safe: true, autoprefixer: false })
          ],
          "sassLoader": {
            "sourceMap": false,
            "includePaths": []
          },
          "lessLoader": {
            "sourceMap": false
          },
          "context": ""
        }
      }),
      new AotPlugin({
        "mainPath": "main.ts",
        "hostReplacementPaths": {
          'environments/environment.ts': options.prod ?
            "environments/environment.prod.ts" :
            'environments/environment.ts'
        },
        "exclude": [],
        "tsConfigPath": "src/tsconfig.app.json"
      })
    ],
    node: {
      fs: 'empty',
      global: true,
      crypto: 'empty',
      tls: 'empty',
      net: 'empty',
      process: true,
      module: false
    },
  };

  const devConfig = require('./webpack/dev');
  const prodConfig = require('./webpack/prod');
  let webpackConfig;

  if (options.prod) {
    webpackConfig = webpackMerge({}, commonConfig, prodConfig);
  } else {
    webpackConfig = webpackMerge({}, commonConfig, devConfig);
  }

  return webpackConfig;
};
