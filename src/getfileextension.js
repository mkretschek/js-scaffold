define(function () {
  'use strict';

  return function (path) {
    // Strip hashes and url-encoded data
    var parts;
    
    parts = path
      .split(/#|\?/g)[0]
      .split('/')
      .pop()
      .split('.');

    return parts.length > 1 ? parts.pop() : null;
  };
});
