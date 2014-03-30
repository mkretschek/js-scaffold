define([
  'src/isarray'
], function (
  isArray
) {
  describe('isArray()', function () {
    it('is a function', function () {
      expect(isArray).to.be.a('function');
    });

    it('returns true for array literals', function () {
      expect(isArray([])).to.be.true;
    });

    it('returns true for instantiated Arrays', function () {
      expect(isArray(new Array(5))).to.be.true;
    });

    it('returns false for strings', function () {
      expect(isArray('foo')).to.be.false;
    });

    it('returns false for null', function () {
      expect(isArray(null)).to.be.false;
    });

    it('returns false for undefined', function () {
      expect(isArray(undefined)).to.be.false;
    });

    it('returns false for numbers', function () {
      expect(isArray(123)).to.be.false;
    });

    it('returns false for objects', function () {
      expect(isArray({})).to.be.false;
    });

    it('returns false for object with length property', function () {
      expect(isArray({length : 3})).to.be.false;
    });
  });
});
