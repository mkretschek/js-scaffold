define([
  '../datastorage'
], function (
  DataStorage
) {
  'use strict';

  // This DataStorage instance should be used only for handling data required
  // by components, e.g.: non-public event handlers.
  return new DataStorage();
});
