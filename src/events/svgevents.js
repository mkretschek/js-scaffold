define(function () {
  // These events are defined in the SVG specification
  // @see http://www.w3.org/TR/SVG/interact.html#SVGEvents
  // NOTE: SVG elements should also support manu DOM events, like 'focusin',
  // 'click', etc.
  return {
    // @interface TimeEvent
    // A SMIL animation element begins.
    BEGIN_EVENT : 'beginEvent',

    // @interface TimeEvent
    // A SMIL animation element ends.
    END_EVENT : 'endEvent',

    // @interface TimeEvent
    // A SMIL animation element is repeated.
    REPEAT_EVENT : 'repeatEvent',

    // @interface SVGEvent
    // Page loading has been stopped before the SVG was loaded.
    SVG_ABORT : 'SVGAbort',

    // @interface SVGEvent
    // An error has occurred before the SVG was loaded.
    SVG_ERROR : 'SVGError',

    // @interface SVGEvent
    // An SVG document has been loaded and parsed.
    SVG_LOAD : 'SVGLoad',

    // @interface SVGEvent
    // An SVG document is being resized.
    SVG_RESIZE : 'SVGResize',

    // @interface SVGEvent
    // An SVG document is being scrolled.
    SVG_SCROLL : 'SVGScroll',

    // @interface SVGEvent
    // An SVG document has been removed from a window or frame.
    SVG_UNLOAD : 'SVGUnload',

    // @interface SVGEvent
    // An SVG document is being zoomed.
    SVG_ZOOM : 'SVGZoom'
  };
});
