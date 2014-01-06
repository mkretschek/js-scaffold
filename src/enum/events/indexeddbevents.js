define(function () {
  // These events are defined in the Indexed Database API specification.
  // @see http://www.w3.org/TR/IndexedDB/
  return {
    // @interface Event
    // A transaction has been aborted.
    ABORT : 'abort',

    // @interface Event
    // An open connection to a database is blocking a versionchange
    // transaction on the same database.
    BLOCKED : 'blocked',

    // @interface ???
    // Requests have completed and transaction has committed.
    COMPLETE : 'complete',

    // @interface Event
    // A request caused an error and failed.
    ERROR : 'error',

    // A request successfully completed (does not mean a transaction was
    // successfully completed).
    // @see note on http://www.w3.org/TR/IndexedDB/#widl-IDBObjectStore-add-IDBRequest-any-value-any-key
    SUCCESS : 'success',

    // @interface Event
    // An attempt was made to open a database with a version number higher
    // than its current version. A versionchange transaction has been created.
    UPGRADE_NEEDED : 'upgradeneeded',

    // @interface Event
    // A versionchange transaction completed.
    VERSION_CHANGE : 'versionchange'
  };
});
