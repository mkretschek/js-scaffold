define(function () {
  'use strict';
  // isNumeric()
  // From: http://stackoverflow.com/a/1830844
  return function (val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  };
});
