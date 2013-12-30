define([
  'src/events/type'
], function (
  Type
) {
  return function () {
    describe('Type enumeration', function () {
      it('is an object', function () {
        expect(Type).to.be.an('object');
      });

      it('contains only strings', function () {
        var
          key,
          e,
          events = [];

        for (key in Type) {
          if (Type.hasOwnProperty(key)) {
            e = Type[key];
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
  };
});
