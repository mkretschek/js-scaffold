define([
  './datastorage',
  './isarray',
  './isarraylike',
  './events/event',
], function (
  DataStorage,
  isArray,
  isArrayLike,
  Event
) {
  'use strict';

  var
    _eventData = new DataStorage();

  function _createListenerObject(fn, once) {
    if (typeof fn !== 'function') {
      throw(new TypeError('Invalid listener'));
    }
    var listener = {fn : fn};
    if (once) { listener.once = true; }
    return listener;
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

  function _removeListener(target, eventType, listeners, fn) {
    var
      listenerIndex = _getListenerIndex(listeners, fn);

    if (~listenerIndex) {
      listeners.splice(listenerIndex, 1);
      if (!listeners.length) {
        _eventData.unset(target, eventType);
      }
    }
  }

  function _addEventListener(target, eventType, listener) {
    var
      listeners = _eventData.get(target, eventType),
      listenerIndex = -1,
      curr,
      len,
      i;

    if (!listeners) {
      _eventData.set(target, eventType, [listener]);
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
  }

  function listen(target, eventType, fn) {
    _addEventListener(target, eventType, _createListenerObject(fn));
  }

  function listenOnce(target, eventType, fn) {
    _addEventListener(target, eventType, _createListenerObject(fn, true));
  }

  function unlisten(target, eventType, fn) {
    // Remove all listeners for all events
    if (!target && !eventType && !fn) {
      return _eventData.unset();
    }

    if (!fn) {
      return _eventData.unset(target, eventType);
    }

    var
      listeners = _eventData.get(target, eventType),
      curr,
      key,
      len,
      i;


    if (!listeners) { return; }

    // Remove the listener from the eventType on the target
    if (target && eventType) {
      return _removeListener(target, eventType, listeners, fn);
    }

    // Remove the listener from all eventTypes on the target
    if (target) {
      for (key in listeners) {
        if (listeners.hasOwnProperty(key)) {
          _removeListener(target, key, listeners[key], fn);
        }
      }
      return;
    }

    // Remove the listener from the eventType on all targets
    if (eventType) {
      for (i = 0, len = listeners.objects.length; i < len; i += 1) {
        _removeListener(listeners.objects[i], eventType, listeners.data[i], fn);
      }
      return;
    }

    // Remove the listener from all eventTypes on all targets
    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        curr = listeners[key];
        for (i = 0, len = curr.objects.length; i < len; i += 1) {
          _removeListener(curr.objects[i], key, curr.data[i], fn);
        }
      }
    }
  }

  function trigger(target, eventType, params) {
    var
      listeners = _eventData.get(target, eventType),
      unlistenList = [],
      args,
      curr,
      len,
      i,
      e;

    if (!listeners) { return; }

    e = _getEvent(target, eventType, params);

    for (i = 0, len = listeners.length; i < len; i++) {
      curr = listeners[i];
      args = e.detail && e.detail.args ?
        Array.prototype.slice.call(e.detail.args, 0) : [];
      args.splice(0, 0, e);
      curr.fn.apply(target, args);
      if (curr.once) { unlistenList.push(curr.fn); }
    }

    if (unlistenList.length) {
      for (i = 0, len = unlistenList.length; i < len; i++) {
        unlisten(target, eventType, unlistenList[i]);
      }
    }
  }

  return {
    getListeners : function (target, eventType) {
      return _eventData.get(target, eventType);
    },
    listen : listen,
    listenOnce : listenOnce,
    unlisten : unlisten,
    trigger : trigger
  };
});
