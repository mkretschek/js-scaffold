define([
  'src/bitmaskenabled'
], function (
  bitmaskEnabled
) {
  describe('bitmaskEnabled()', function () {
    function getInt(bin) {
      return parseInt(bin, 2);
    }

    it('is a function', function () {
      expect(bitmaskEnabled).to.be.a('function');
    });

    it('returns true if the flag is enabled in the bitmask', function () {
      var
        bitmask = getInt('101'),
        flag = getInt('100');

      expect(bitmaskEnabled(bitmask, flag)).to.be.true;
    });

    it('returns false if the flag is not enabled in the bitmask', function () {
      var
        bitmask = getInt('101'),
        flag = getInt('10');

      expect(bitmaskEnabled(bitmask, flag)).to.be.false;
    });
  }); // bitmaskEnabled()
});
