define([
  '../extend',
  './events/html5events',
  './events/domevents',
  // './events/progressevents', // progress events are included in xmlhttprequest
  './events/batteryevents',
  './events/clipboardevents',
  './events/cssevents',
  './events/deviceevents',
  './events/indexeddbevents',
  './events/svgevents',
  './events/xmlhttprequestevents'
], function (
  extend,
  Html5Events,
  DomEvents,
  // ProgressEvents,
  BatteryEvents,
  ClipboardEvents,
  CssEvents,
  DeviceEvents,
  IndexedDBEvents,
  SVGEvents,
  XMLHttpRequestEvents
) {
  // EventType
  // Defines an enumeration of all standard events dispatched by browsers.
  return extend({},
    Html5Events,
    DomEvents,
    // ProgressEvents,
    XMLHttpRequestEvents,
    BatteryEvents,
    ClipboardEvents,
    CssEvents,
    DeviceEvents,
    IndexedDBEvents,
    SVGEvents
  );
});
