define(function () {
  // Progress events
  // As defined in the Progress Events spec.
  // @see http://www.w3.org/TR/progress-events/#suggested-names-for-events-using-the-progressevent-interface
  return {
    // @interface ProgressEvent
    // Progression has been terminated (not due to an error).
    ABORT : 'abort',

    // @interface ProgressEvent
    // Progression has failed.
    ERROR : 'error',

    // @interface ProgressEvent
    // Progression has been successful.
    LOAD : 'load',

    // @interface ProgressEvent
    // Progress has stopped (after "error", "abort" or "load"
    // have been dispatched).
    LOAD_END : 'loadend',

    // @interface ProgressEvent
    // Progress has begun.
    LOAD_START : 'loadstart',

    // @interface ProgressEvent
    // In progress.
    PROGRESS : 'progress'
  };
});
