'use strict';

module.exports = function(a, b) {
  var arr;
  var key;
  var obj = {};

  if (typeof b === 'object') {
    for (key in b) {
      if (key.split('/').length === 1) {
        arr = key.split('.');

        if (['js', 'css', 'map'].indexOf(arr[1]) === -1) {
          arr.splice(1, 1);
        }

        obj[arr.join('.')] = b[key];
      }
    }

    return obj;
  }

  if (typeof b === 'string') {
    return b;
  }

  return undefined;
};
