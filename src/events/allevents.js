define([
  '../extend',
  './html5events',
  './domevents',
  // './progressevents', // progress events are included in xmlhttprequest
  // './batteryevents',
  // './clipboardevents',
  // './deviceevents',
  // './indexeddbevents',
  // './svgevents',
  // './webaudioevents',
  './xmlhttprequestevents'
], function (
  extend,
  Html5Events,
  DomEvents,
  // ProgressEvents,
  // BatteryEvents,
  // ClipboardEvents,
  // DeviceEvents,
  // IndexedDBEvents,
  // SVGEvents,
  // WebAudioEvents,
  XMLHttpRequestEvents
) {
  // EventType
  // Defines an enumeration of all standard events dispatched by browsers.
  return extend({},
    Html5Events,
    DomEvents,
    // ProgressEvents, // progressevents
    XMLHttpRequestEvents
    // BatteryEvents,
    // ClipboardEvents,
    // DeviceEvents,
    // IndexedDBEvents,
    // SVGEvents,
    // WebAudioEvents
  );
});
