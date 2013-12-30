define(function () {
  'use strict';

  return function (child, parent) {
    function Tmp() {}

    if (parent.constructor === Function) {
      child.super = parent.prototype;
      Tmp.prototype = parent.prototype;
    } else {
      // Parent is an object rather than a constructor
      child.super = parent;
      Tmp.prototype = parent;
    }

    child.prototype = new Tmp();
    child.prototype.constructor = child;
  };
});
