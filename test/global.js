define([
  'src/global'
], function (
  global
) {
  var currentGlobal = this;

  describe('global', function () {
    it('is an object', function () {
      expect(global).to.be.an('object');
    });

    it('is the global object', function () {
      expect(global).to.equal(currentGlobal);

      if (window) {
        expect(global).to.equal(window);
      }
    });
  });
});
