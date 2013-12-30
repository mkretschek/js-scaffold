define([
  'src/returntrue'
], function (
  returnTrue
) {
  describe('returnTrue()', function () {
    it('is a function', function () {
      expect(returnTrue).to.be.a('function');
    });

    it('returns true', function () {
      expect(returnTrue()).to.be.true;
    });
  });
});
