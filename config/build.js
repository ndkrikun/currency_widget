'use strict';

var _ = require('lodash');

var _configs = {
  desktop: require('./desktop.js'),
};

module.exports = function(_env, _path) {
  var config;
  var opt = {
    debug: true,
    devtool: 'source-map',
    watch: true
  };

  return _.merge(opt, _configs['desktop'](_path, false, false));
};
