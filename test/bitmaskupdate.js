define([
  'src/bitmaskupdate'
], function (
  bitmaskUpdate
) {
  describe('bitmaskUpdate()', function () {
    function getInt(bin) {
      return parseInt(bin, 2);
    }

    it('is a function', function () {
      expect(bitmaskUpdate).to.be.a('function');
    });

    it('sets a given flag to 1 if enable is true', function () {
      var
        bitmask = getInt('101'),
        flag = getInt('10'),
        result = getInt('111');
      expect(bitmaskUpdate(bitmask, flag, true)).to.equal(result);
    });

    it('leaves the flag as is if enable is true and flag is already 1',
      function () {
        var
          bitmask = getInt('101'),
          flag = getInt('100'),
          result = getInt('101');
        expect(bitmaskUpdate(bitmask, flag, true)).to.equal(result);
      });

    it('sets a given flag to 0 if enable is false', function () {
      var
        bitmask = getInt('101'),
        flag = getInt('100'),
        result = getInt('001');
      expect(bitmaskUpdate(bitmask, flag, false)).to.equal(result);
    });

    it('leaves the flag as is if enable is false and flag is already 0',
      function () {
        var
          bitmask = getInt('101'),
          flag = getInt('10'),
          result = getInt('101');
        expect(bitmaskUpdate(bitmask, flag, false)).to.equal(result);
      });
  });
});
