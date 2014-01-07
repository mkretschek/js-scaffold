define(function () {
  'use strict';

  // bitmaskUpdate()
  // TODO: I don't remember the concepts behind bitmasks, therefore "flag" may
  // not be the most appropriate term here.
  return function (bitmask, flag, enable) {
    return enable ? bitmask | flag : bitmask & ~flag;
  };
});
