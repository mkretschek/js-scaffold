define(function () {
  // isPowerOfTwo()
  return function (val) {
    val = parseInt(val);
    return !!(val && !(val & (val - 1)))
  };
});
