define(function () {
  // bitmaskEnabled()
  // TODO: I don't remember the concepts behind bitmasks, therefore "flag" may
  // not be the most appropriate term here.
  return function (bitmask, flag) {
    return !!(bitmask & flag);
  };
});
