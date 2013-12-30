define(function () {
  'use strict';
  return function (o) {
    return o &&
      typeof o === 'object' &&
      isFinite(o.length) &&
      o.length >= 0 &&
      o.length % 1 === 0 &&
      o.length < Math.pow(2, 32);
  };
});
