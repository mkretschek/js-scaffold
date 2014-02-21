define([
  './_datastorage',
  '../eventhandler'
], function (
  _dataStorage,
  EventHandler
) {
  // An EventHandler instance for internal use only. Components that rely on
  // internal events to work, should use this eventhandler. This prevents
  // the user from removing those event handlers, making the component stop
  // working.
  return new EventHandler(_dataStorage);
});
