define([
  'src/isarraylike'
], function (
  isArrayLike
) {

  describe('isArrayLike()', function () {
    it('is a function', function () {
      expect(isArrayLike).to.be.a('function');
    });

    it('returns true for an array', function () {
      expect(isArrayLike([])).to.be.true;
    });

    it('returns true for an object with a length property', function () {
      var o = {
        length : 0
      };

      expect(isArrayLike(o)).to.be.true;
    });

    it('returns true for an arguments object', function () {
      expect(isArrayLike(arguments)).to.be.true;
    });

    it('returns false for strings', function () {
      expect(isArrayLike('foo')).to.be.false;
    });

    it('returns false for a number', function () {
      expect(isArrayLike(123)).to.be.false;
    });

    it('returns false for object without a length property', function () {
      expect(isArrayLike({})).to.be.false;
    });

    it('returns false for object with non-numeric length property', function () {
      var o = {length : 'one'};
      expect(isArrayLike(o)).to.be.false;
    });
  });
});
