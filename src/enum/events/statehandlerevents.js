define(function () {
  // Some custom events commonly used by web applications. These events are
  // meant to be triggered automatically by the StateHandler class when
  // the object's state changes.
  return {
    STATE_CHANGE  : 'statechange',
    STATE_SUPPORT_CHANGE : 'statesupportchange',

    ACTIVATE      : 'activate',
    CLOSE         : 'close',
    DEACTIVATE    : 'deactivate',
    DISABLE       : 'disable',
    DISPOSE       : 'dispose',
    ENABLE        : 'enable',
    HIDE          : 'hide',
    INSTALL       : 'install',
    LOAD          : 'load',
    OPEN          : 'open',
    RENDER        : 'render',
    SHOW          : 'show',
    UNINSTALL     : 'uninstall',
    UNLOAD        : 'unload',
    // TODO: I couldn't find an antonym for "render" that wouldn't get confused
    // with "hide" or "remove". I googled quickly and just found out that
    // "unrender" does not exist, so, I probably need to spend more time to
    // get a better event name (or just go with "remove").
    UNRENDER      : 'unrender'
  };
});
