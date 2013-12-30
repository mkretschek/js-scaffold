define([
  'src/returnfalse'
], function (
  returnFalse
) {
  describe('returnFalse()', function () {
    it('is a function', function () {
      expect(returnFalse).to.be.a('function');
    });

    it('returns false', function () {
      expect(returnFalse()).to.be.false;
    });
  });
});
