define([
  '../extend',
  './html5events',
  './domevents',
  // './progressevents', // progress events are included in xmlhttprequest
  './batteryevents',
  './clipboardevents',
  './cssevents',
  './deviceevents',
  './indexeddbevents',
  './svgevents',
  './xmlhttprequestevents'
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
