define(function () {
  var State = {};

  [
    'ABORTED',
    'ACTIVE',
    'CLOSED',
    'CLOSING',
    'DISPOSED',
    'ENABLED',
    'FAILED',
    'INITIALIZED',
    'INSTALLED',
    'LOADED',
    'LOADING',
    'OPEN',
    'OPENING',
    'RENDERED',
    'VISIBLE',
    'READY'
  ].forEach(function (state, i) {
    State[state] = Math.pow(2, i);
  });

  return State;
});

