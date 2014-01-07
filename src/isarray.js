define(function () {
  'use strict';

  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
});
