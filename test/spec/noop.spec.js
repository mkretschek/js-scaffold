define([
  'src/noop'
], function (
  noop
) {
  describe('noop()', function () {
    it('is a function', function () {
      expect(noop).to.be.a('function');
    });

    it('does not return anything', function () {
      expect(noop()).to.be.undefined;
    });
  });
});
