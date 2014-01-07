define([
  './enum/events/statehandlerevents',
  './enum/state',
  './bitmaskenabled',
  './bitmaskupdate',
  './datastorage',
  './isarraylike'
], function (
  StateEvent,
  State,
  bitmaskEnabled,
  bitmaskUpdate,
  DataStorage,
  isArrayLike
) {

  'use strict';

  function _getStateChangeEvent(state, enable) {
    switch (state) {
    case State.ACTIVE:
      return enable ? StateEvent.ACTIVATE : StateEvent.DEACTIVATE;
    case State.ENABLED:
      return enable ? StateEvent.ENABLE : StateEvent.DISABLE;
    case State.VISIBLE:
      return enable ? StateEvent.SHOW : StateEvent.HIDE;
    case State.OPEN:
      return enable ? StateEvent.OPEN : StateEvent.CLOSE;
    case State.LOADED:
      return enable ? StateEvent.LOAD : StateEvent.UNLOAD;
    case State.DISPOSED:
      // Disposed events should not be "undisposed"
      if (enable) { return StateEvent.DISPOSE; }
      break;
    case State.RENDERED:
      // XXX: I couldn't find an antonym for "render" that wouldn't
      // get confused with "hide" or "remove" (as from a list).
      return enable ? StateEvent.RENDER : StateEvent.UNRENDER;
    case State.INSTALLED:
      return enable ? StateEvent.INSTALL : StateEvent.UNINSTALL;
    }
  }

  function StateHandler(eventHandler, dataStorage) {
    this.eventHandler = eventHandler;
    this.dataStorage = dataStorage || new DataStorage();

    var self = this;

    // XXX: ain't there a better way to create this listener? How to access
    // the state handler's eventHandler from the listener?
    this._onStateChange = function (e, state, enable) {
      if (self.eventHandler) {
        var event = _getStateChangeEvent(state, enable);
        if (event) {
          self.eventHandler.trigger(e.target, event);
        }
      }
    };
  }

  StateHandler.prototype = {
    _triggerStateChange : function (target, state, enable) {
      if (this.eventHandler) {
        this.eventHandler.trigger(
          target,
          StateEvent.STATE_CHANGE,
          [state, enable]
        );
      }
    },

    _triggerStateSupportChange : function (target, state, support) {
      if (this.eventHandler) {
        this.eventHandler.trigger(
          target,
          StateEvent.STATE_SUPPORT_CHANGE,
          [state, support]
        );
      }
    },

    _setStateChangeListener : function (target) {
      if (this.eventHandler) {
        this.eventHandler.listen(
          target,
          StateEvent.STATE_CHANGE,
          this._onStateChange
        );
      }
    },

    _removeStateChangeListener : function (target) {
      if (this.eventHandler) {
        this.eventHandler.unlisten(
          target,
          StateEvent.STATE_CHANGE,
          this._onStateChange
        );
      }
    },

    _getTrigger : function (field) {
      return field === '_states' ?
        this._triggerStateChange :
        this._triggerStateSupportChange;
    },

    _setFlag : function (target, field, flag, enable) {
      if (isArrayLike(flag)) {
        return this._setMultipleFlags(target, field, flag, enable);
      }

      var
        targetFlags = this.dataStorage.get(target, field),
        trigger = this._getTrigger(field);


      if (bitmaskEnabled(targetFlags, flag) !== enable) {
        this.dataStorage.set(
          target,
          field,
          bitmaskUpdate(targetFlags, flag, enable)
        );
        trigger.call(this, target, flag, enable);
      }
    },

    _setMultipleFlags : function (target, field, flags, enable) {
      var
        initialFlags = this.dataStorage.get(target, field),
        updatedFlags = initialFlags,
        trigger = this._getTrigger(field),
        flag,
        len,
        i;

      for (i = 0, len = flags.length; i < len; i += 1) {
        flag = flags[i];
        if (bitmaskEnabled(updatedFlags, flag) !== enable) {
          updatedFlags = bitmaskUpdate(updatedFlags, flag, enable);
          this.dataStorage.set(target, field, updatedFlags);
          trigger.call(this, target, flag, enable);
        }
      }
    },

    _hasFlag : function (target, field, flag) {
      var flags = this.dataStorage.get(target, field);
      return flags ? bitmaskEnabled(flags, flag) : false;
    },

    setStateSupport : function (target, state, support) {
      // Support for the state is being removed while the state is active.
      // We should disable it first.
      if (!support && this.hasState(target, state)) {
        this.setState(target, state, false);
      }

      this._setFlag(target, '_support', state, support);

      var supportedStates = this.dataStorage.get(target, '_support');

      // This is the first state being supported by the target.
      if (support && supportedStates === state) {
        this._setStateChangeListener(target);

      // Support to all states has been dropped.
      } else if (!support && !supportedStates) {
        this._removeStateChangeListener(target);
        this.dataStorage.unset(target);
      }
    },

    setState : function (target, state, enable) {
      if (!this.hasStateSupport(target, state)) {
        throw(new Error('State not supported'));
      }

      this._setFlag(target, '_states', state, enable);
    },

    hasStateSupport : function (target, state) {
      return this._hasFlag(target, '_support', state);
    },

    hasState : function (target, state) {
      return this._hasFlag(target, '_states', state);
    }
  };

  return StateHandler;
});
