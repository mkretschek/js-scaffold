define(function () {
  'use strict';

  // addSingletonGetter()
  return function (Constructor) {
    Constructor.getSingleton = function () {
      if (!Constructor._singleton) {
        Constructor._singleton = new Constructor();
      }

      return Constructor._singleton;
    };
  };
});
