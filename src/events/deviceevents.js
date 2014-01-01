define(function () {
  // Unless otherwise stated, these events are defined by the
  // DeviceOrientation Event Specification.
  //
  // @see http://dev.w3.org/geo/api/spec-source-orientation.html
  // @see Ambient Light Events https://dvcs.w3.org/hg/dap/raw-file/tip/light/Overview.html#device-light
  // @see Proximity Events https://dvcs.w3.org/hg/dap/raw-file/tip/proximity/Overview.html
  // @see Screen Orientation https://dvcs.w3.org/hg/screen-orientation/raw-file/tip/Overview.html#event-handlers
  return {
    // @interface Event
    // The compass used to obtain orientation data is in need of calibration.
    COMPASS_NEEDS_CALIBRATION : 'compassneedscalibration',

    // @interface DeviceLightEvent
    // @spec Ambient Light Events
    // Fresh data is available from a light sensor.
    DEVICE_LIGHT : 'devicelight',

    // @interface DeviceMotionEvent
    // Fresh data is available from a motion sensor.
    DEVICE_MOTION : 'devicemotion',

    // @interface DeviceOrientationEvent
    // Fresh data is available from an orientation sensor.
    DEVICE_ORIENTATION : 'deviceorientation',

    // @interface DeviceProximityEvent
    // @spec Proximity Events
    // Fresh data is available from a proximity sensor (indicates an
    // approximated distance between the device and a nearby object).
    DEVICE_PROXIMITY : 'deviceproximity',

    // @interface Event
    // @spec Screen Orientation
    // The orientation of the device (portrait/landscape) has changed.
    ORIENTATION_CHANGE : 'orientationchange',

    // @interface SensorEvent
    // @spec Proximity Events
    // Fresh data is available from a proximity sensor (indicates whether
    // the nearby object is near the device or not).
    USER_PROXIMITY : 'userproximity'
  };
});
