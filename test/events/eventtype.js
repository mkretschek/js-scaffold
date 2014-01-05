define([
  'src/events/allevents'
], function (
  EventType
) {
  describe('EventType enumeration', function () {
    it('is an object', function () {
      expect(EventType).to.be.an('object');
    });

    it('contains only strings', function () {
      var
        key,
        e,
        events = [];

      for (key in EventType) {
        if (EventType.hasOwnProperty(key)) {
          e = EventType[key];
          expect(e).to.be.a('string');

          if (~events.indexOf(e)) {
            // Multiple keys for an event are allowed, this is just to help us
            // prevent unintended duplicates.
            console.warn('Multiple keys found in event.Type for event: ', e);
          } else {
            events.push(e);
          }
        }
      }
    });
  });
});
