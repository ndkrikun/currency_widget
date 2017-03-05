'use strict';

var _configs = require(__dirname + '/config/build');

var _load = function(env) {
  return _configs && _configs(env, __dirname);
};

module.exports = _load(process.env);
