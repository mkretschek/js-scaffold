define(function () {
  // Events are defined in the Battery Status API.
  // @see https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html
  return {
    // @interface Event
    // The battery begins or stops charging.
    CHARGING_CHANGE : 'chargingchange',

    // @interface Event
    // The chargingTime attribute has been updated.
    CHARGING_TIME_CHANGE : 'chargingtimechange',

    // @interface Event
    // The dischargingTime attribute has been updated.
    DISCHARGING_TIME_CHANGE : 'dischargingtimechange',

    // @interface Event
    // The level attribute has been updated.
    LEVEL_CHANGE : 'levelchange'
  };
});
