var path = require('path');
var webpack = require('webpack');
var presenter = require('./helpers/json-presenter.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var Sprite = require('png-sprite-webpack');
var WebpackAssetsManifest = require('webpack-assets-manifest');
var ClearAssets = require('./helpers/clear-assets.js');

module.exports = function(_path, _prod, _nosprites) {
  var _output = 'currency_widget/assets';
  var _input = 'currency_widget/static';
  var _publicPath = '/static/';

  var _plugins = [
    new webpack.NoErrorsPlugin(),
  ];

  // if (!_nosprites) {
  //   _plugins.push(new Sprite({
  //     source: path.join(_path, _output, 'images/chunks'),
  //     source2x: path.join(_path, _output, 'images/chunks2x'),
  //     outputCss: path.join(_path, _output, 'stylesheets/base'),
  //     outputImg: path.join(_path, _input, 'images'),
  //     spriteName: 'sprite',
  //     processor: 'sass',
  //     resolvedPath: true
  //   }));
  // }

  _plugins.push(new ExtractTextPlugin('[name].css', {allChunks: true}));

  _plugins.push(new WebpackAssetsManifest({
    output: path.join(_path, _input, 'manifest.json'),
    replacer: presenter,
    space: '\t'
  }));

  if (_prod) {
    _plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      }
    }));
  }

  if (!_prod) {
    _plugins.push(new ClearAssets({
      assets: path.join(_path, _input),
      manifest: path.join(_path, _input, 'manifest.json')
    }));
  }

  return {
    name: 'desktop',

    entry: {
      application: [
        path.join(_path, _output, '/javascripts/application.js'),
        path.join(_path, _output, '/stylesheets/application.sass'),
      ]
    },

    output: {
      path: path.join(_path, _input),
      publicPath: _publicPath,
      filename: '[name].js',
    },

    resolve: {
      moduleDirectories: ['node_modules'],
      alias: {
        _fonts: path.join(_path, _output, 'fonts'),
        _stylesheets: path.join(_path, _output, 'stylesheets'),
      },
    },

    module: {
      loaders: [{
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'file?name=fonts/.[ext]',
      }, {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css!autoprefixer?{browsers:["not ie <= 9", "last 3 version"]}!sass?sourceMap&indentedSyntax')
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-async-to-generator']
        }
      }],
      noParse: /\.DS_Store/
    },

    plugins: _plugins
  };
};
