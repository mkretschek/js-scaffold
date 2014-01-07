define(function () {
  'use strict';

  // addSingletonGetter()
  return function (cstr) {
    cstr.getSingleton = function () {
      if (!cstr._singleton) {
        cstr._singleton = new cstr;
      }

      return cstr._singleton;
    };
  };
});
