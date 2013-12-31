define([
  './progressevents',
  '../extend'
], function (
  ProgressEvents,
  extend
) {
  // XMLHttpRequest triggers the events defined in the Progress Events
  // specification, with the addition of the timeout and readystatechange
  // events.
  // @see http://www.w3.org/TR/XMLHttpRequest/#event-xhr-progress
  // @see http://www.w3.org/TR/progress-events/#suggested-names-for-events-using-the-progressevent-interface
  return extend({
    // @interface Event
    // The readyState attribute of a document has changed.
    READY_STATE_CHANGE : 'readystatechange',

    // @interface Event
    // When the author specified timeout has passed before the request could
    // complete.
    TIMEOUT : 'timeout'
  }, ProgressEvents);
});
