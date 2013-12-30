define([
  '../extend',
  '../returntrue',
  '../returnfalse'
], function (
  extend,
  returnTrue,
  returnFalse
) {
  // From jQuery.Event: https://github.com/jquery/jquery/blob/7e8a91c205723f11cd00c8834f348a649ab15926/src/event.js#L662
  function Event(src, params) {
    // src is an Event object
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;

      this.isDefaultPrevented = src.defaultPrevented ||
        src.defaultPrevented === undefined &&
        src.getPreventDefault &&
        src.getPreventDefault() ?
          returnTrue : returnFalse;
    } else {
      this.type = src;
    }

    if (params) {
      extend(this, params);
    }

    this.timeStamp = src && src.timeStamp || (new Date()).getTime();
  }

  Event.prototype = {
    isDefaultPrevented : returnFalse,
    isPropagationStopped : returnFalse,
    isImmediatePropagationStopped : returnFalse,

    preventDefault : function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },

    stopPropagation : function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },

    stopImmediatePropagation : function () {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    }
  };

  return Event;
});
