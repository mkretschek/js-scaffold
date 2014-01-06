define([
  'src/enum/state',
  'src/math/ispoweroftwo'
], function (
  State,
  isPowerOfTwo
) {
  describe('State enumeration', function () {
    it('is an object', function () {
      expect(State).to.be.an('object');
    });

    it('contains only numbers', function () {
      var key;

      for (key in State) {
        if (State.hasOwnProperty(key)) {
          expect(State[key]).to.be.a('number');
        }
      }
    });

    it('does not have duplicate values', function () {
      var
        key,
        values = [];

      for (key in State) {
        if (State.hasOwnProperty(key)) {
          expect(values).to.not.contain(State[key]);
          values.push(State[key]);
        }
      }
    });

    it('only contains power of 2 values', function () {
      var key;
      for (key in State) {
        if (State.hasOwnProperty(key)) {
          expect(isPowerOfTwo(State[key])).to.be.true;
        }
      }
    });
  });
});
