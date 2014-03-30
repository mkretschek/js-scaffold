define([
  'src/math/ispoweroftwo'
], function (
  isPowerOfTwo
) {
  describe('isPowerOfTwo()', function () {
    it('is a function', function () {
      expect(isPowerOfTwo).to.be.a('function');
    });

    it('returns true if value is a power of two', function () {
      var
        val,
        i = 0;

      // The maximum value representable with the Number type is 2^53. After
      // that, we might run into false positives as some operations (including
      // bitwise operators) start returning wrong results, e.g.:
      //   Math.pow(2, 73) === Math.pow(2, 73) - 1;
      while (i <= 53) {
        val = Math.pow(2, i);
        expect(isPowerOfTwo(val), 'w/ ' + val).to.be.true;
        i++;
      }
    });

    it('returns false if value is not a power of two', function () {
      // XXX: kinda lazy to think of a better way to test this. Needs some
      // improvement.
      expect(isPowerOfTwo(0)).to.be.false;
      expect(isPowerOfTwo(3)).to.be.false;
      expect(isPowerOfTwo(33)).to.be.false;
      expect(isPowerOfTwo(100)).to.be.false;
    });

    it('works with numeric strings', function () {
      expect(isPowerOfTwo('1')).to.be.true;
      expect(isPowerOfTwo('4')).to.be.true;
      expect(isPowerOfTwo('256')).to.be.true;
    });

    it('returns false if value is not a number', function () {
      expect(isPowerOfTwo(null), 'w/ null').to.be.false;
      expect(isPowerOfTwo(undefined), 'w/ undefined').to.be.false;
      expect(isPowerOfTwo('foo'), 'w/ string').to.be.false;
      expect(isPowerOfTwo(''), 'w/ empty string').to.be.false;
      expect(isPowerOfTwo({}), 'w/ object').to.be.false;
      expect(isPowerOfTwo([]), 'w/ array').to.be.false;
    });
  });
});
