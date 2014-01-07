define([
  '../isnumeric'
], function (
  isNumeric
) {
  'use strict';

  // isPowerOfTwo()
  return function (val) {
    if (!isNumeric(val)) { return false; }
    return !!(val && !(val & (val - 1)));
  };
});
