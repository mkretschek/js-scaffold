define([
  './datastorage',
  './event',
  './inherit',
  './extend',
  './isarraylike'
], function (
  DataStorage,
  Event,
  inherit,
  extend,
  isArrayLike
) {
  'use strict';

  function Listener(fn, once) {
    if (typeof fn !== 'function') {
      throw(new TypeError('Invalid listener'));
    }

    this.fn = fn;
    if (once) {
      this.once = true;
    }
  }

  function _getListenerIndex(listeners, fn) {
    var
      len,
      i;

    for (i = 0, len = listeners.length; i < len; i += 1) {
      if (listeners[i].fn === fn) {
        return i;
      }
    }

    return -1;
  }

  function _getEvent(target, eventType, params) {
    if (isArrayLike(params)) {
      params = {detail : {args : params}};
    }

    var
      e = new Event(eventType, params),
      err = e.error || (e.detail && e.detail.error);

    e.target = target;

    if (err) {
      e.message = err.message;
      e.fileName = err.fileName;
      e.lineno = err.lineno;
      e.column = err.column || err.columnNumber;
    }

    return e;
  }


  function EventHandler(dataStorage) {
    this.dataStorage = dataStorage || new DataStorage();
  }


  EventHandler.prototype = {
    _removeListener : function (target, eventType, listeners, fn) {
      var
        listenerIndex = _getListenerIndex(listeners, fn);

      if (~listenerIndex) {
        listeners.splice(listenerIndex, 1);
        if (!listeners.length) {
          this.dataStorage.unset(target, eventType);
        }
      }
    },

    _addEventListener : function (target, eventType, listener) {
      if (!target || !eventType || !listener) { return; }

      var
        listeners = this.dataStorage.get(target, eventType),
        listenerIndex = -1,
        curr,
        len,
        i;

      if (!listeners) {
        this.dataStorage.set(target, eventType, [listener]);
        return;
      }

      listenerIndex = _getListenerIndex(listeners, listener.fn);

      if (~listenerIndex) {
        // The listener is already registered but was set to run only once,
        // just remove the flag.
        if (!listener.once && listeners[listenerIndex].once) {
          delete listeners[listenerIndex].once;
        }
        return;
      }

      listeners.push(listener);
    },

    listen : function (target, eventType, fn) {
      this._addEventListener(target, eventType, new Listener(fn));
    },

    listenOnce : function (target, eventType, fn) {
      this._addEventListener(target, eventType, new Listener(fn, true));
    },

    unlisten : function (target, eventType, fn) {
      // Remove all listeners for all events
      if (!target && !eventType && !fn) {
        return this.dataStorage.unset();
      }

      if (!fn) {
        return this.dataStorage.unset(target, eventType);
      }

      var
        listeners = this.dataStorage.get(target, eventType),
        curr,
        key,
        len,
        i;


      if (!listeners) { return; }

      // Remove the listener from the eventType on the target
      if (target && eventType) {
        return this._removeListener(target, eventType, listeners, fn);
      }

      // Remove the listener from all eventTypes on the target
      if (target) {
        for (key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            this._removeListener(target, key, listeners[key], fn);
          }
        }
        return;
      }

      // Remove the listener from the eventType on all targets
      if (eventType) {
        for (i = 0, len = listeners.objects.length; i < len; i += 1) {
          this._removeListener(
            listeners.objects[i],
            eventType,
            listeners.data[i],
            fn
          );
        }
        return;
      }

      // Remove the listener from all eventTypes on all targets
      for (key in listeners) {
        if (listeners.hasOwnProperty(key)) {
          curr = listeners[key];
          for (i = 0, len = curr.objects.length; i < len; i += 1) {
            this._removeListener(curr.objects[i], key, curr.data[i], fn);
          }
        }
      }
    },

    trigger : function (target, eventType, params) {
      var
        listeners = this.dataStorage.get(target, eventType),
        unlistenList = [],
        args,
        curr,
        len,
        i,
        e;

      if (!listeners) { return; }

      e = _getEvent(target, eventType, params);

      for (i = 0, len = listeners.length; i < len; i += 1) {
        curr = listeners[i];
        args = e.detail && e.detail.args ?
          Array.prototype.slice.call(e.detail.args, 0) : [];
        args.splice(0, 0, e);
        curr.fn.apply(target, args);
        if (curr.once) { unlistenList.push(curr.fn); }
      }

      if (unlistenList.length) {
        for (i = 0, len = unlistenList.length; i < len; i += 1) {
          this.unlisten(target, eventType, unlistenList[i]);
        }
      }
    },

    getListeners : function (target, eventType) {
      return this.dataStorage.get(target, eventType);
    }
  };

  EventHandler.Listener = Listener;

  return EventHandler;
});
