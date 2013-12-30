define([
  './isarraylike',
  './events/event',
], function (
  isArrayLike,
  Event
) {
  'use strict';

  var events = {
    Event : Event,

    _events : {},

    getListener : function (fn, once) {
      var listener = {fn : fn};
      if (once) { listener.once = true; }
      return listener;
    },

    addEventListener : function (target, eventType, listener) {
      var
        eventData = events._events[eventType],
        eventTargets,
        eventListeners,
        targetIndex,
        targetListeners,
        curr,
        len,
        i;

      if (!eventData) {
        events._events[eventType] = {
          targets : [target],
          listeners : [[listener]]
        };
        return;
      }

      eventTargets = eventData.targets;
      eventListeners = eventData.listeners;
      targetIndex = eventTargets.indexOf(target);

      if (!~targetIndex) {
        targetIndex = eventTargets.length;
        eventTargets.push(target);
        eventListeners[targetIndex] = [listener];
        return;
      }

      targetListeners = eventListeners[targetIndex];

      for (i = 0, len = targetListeners.length; i < len; i++) {
        curr = targetListeners[i];
        if (curr.fn === listener.fn) {
          // listen() always overrides listenOnce()
          if (curr.once && !listener.once) {
            delete curr.once;
          }
          return;
        }
      }

      targetListeners.push(listener);
    },

    listen : function (target, eventType, fn) {
      events.addEventListener(target, eventType, events.getListener(fn));
    },

    listenOnce : function (target, eventType, fn) {
      events.addEventListener(target, eventType, events.getListener(fn, true));
    },

    unlisten : function (target, eventType, fn) {
      // Remove all listeners for all events
      if (!target && !eventType && !fn) {
        events._events = {};
        return;
      }

      var
        eventData,
        eventTargets,
        eventListeners,
        targetIndex,
        targetListeners,
        key,
        curr,
        len,
        i;


      if (eventType) {
        eventData = events._events[eventType];
        if (!eventData) { return; }

        eventTargets = eventData.targets;
        eventListeners = eventData.listeners;

        if (target) {
          targetIndex = eventTargets.indexOf(target);
          if (!~targetIndex) { return; }

          targetListeners = eventListeners[targetIndex];

          if (fn) {
            for (i = 0, len = targetListeners.length; i < len; i++) {
              if (targetListeners[i].fn === fn) {
                targetListeners.splice(i, 1);
                break;
              }
            }

          // If no listener is given, remove all listeners
          } else {
            targetListeners = eventListeners[targetIndex] = [];
          }

          // Cleanup event targets and listeners if all listeners have been
          // removed
          if (!targetListeners.length) {
            eventTargets.splice(targetIndex, 1);
            eventListeners.splice(targetIndex, 1);
          }

        // If no target is given, remove events for all targets
        } else {
          for (i = 0, len = eventTargets.length; i < len; i++) {
            events.unlisten(eventTargets[i], eventType, fn);
          }
          return;
        }

        // Cleanup event data if all listeners have been removed
        if (!eventTargets.length) {
          delete events._events[eventType];
        }

      // If no type is given, remove events for all types
      } else {
        for (key in events._events) {
          if (events._events.hasOwnProperty(key)) {
            events.unlisten(target, key, fn);
          }
        }
      }
    },

    getListeners : function (target, eventType) {
      var
        eventData = events._events[eventType],
        targetIndex;

      // No listeners for the given event
      if (!eventData) { return; }

      targetIndex = eventData.targets.indexOf(target);

      // No listeners for the given target
      if (!~targetIndex) { return; }

      return eventData.listeners[targetIndex];
    },

    trigger : function (target, eventType, params) {
      var
        targetListeners = events.getListeners(target, eventType),
        unlistenList = [],
        evt,
        curr,
        args,
        len,
        i;

      // No listeners
      if (!targetListeners) { return; }

      evt = events.getEvent(target, eventType, params);

      for (i = 0, len = targetListeners.length; i < len; i++) {
        curr = targetListeners[i];
        args = evt.detail && evt.detail.args ?
          Array.prototype.slice.call(evt.detail.args, 0) : [];
        args.splice(0, 0, evt);
        curr.fn.apply(target, args);
        if (curr.once) { unlistenList.push(curr.fn); }
      }

      if (unlistenList.length) {
        for (i = 0, len = unlistenList.length; i < len; i++) {
          events.unlisten(target, eventType, unlistenList[i]);
        }
      }
    },

    getEvent : function (target, type, params) {
      if (isArrayLike(params)) {
        params = {detail : {args : params}};
      }

      var
        e = new Event(type, params),
        detail = params && params.detail;

      e.target = target;

      if (detail && detail.error) {
        e.message = detail.error.message;
        e.fileName = detail.error.fileName;
        e.lineno = detail.error.lineno;
        e.column = detail.error.column || detail.error.columnNumber;
      }

      return e;
    }
  };

  return events;
});
