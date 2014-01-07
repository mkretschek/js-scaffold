define([
  'src/addsingletongetter'
], function (
  addSingletonGetter
) {
  describe('addSingletonGetter()', function () {
    var instance;

    function Dummy() {}

    it('is a function', function () {
      expect(addSingletonGetter).to.be.a('function');
    });

    it('adds the .getSingleton() static method to the given constructor',
      function () {
        expect(Dummy).to.not.have.property('getSingleton');
        addSingletonGetter(Dummy);
        expect(Dummy).to.have.property('getSingleton');
      });
    
    describe('Constructor.getSingleton()', function () {
      it('is a function', function () {
        expect(Dummy.getSingleton).to.be.a('function');
      });

      it('returns an instance of the constructor', function () {
        instance = Dummy.getSingleton();
        expect(instance).to.be.instanceof(Dummy);
      });

      it('always returns the same instance', function () {
        expect(Dummy.getSingleton()).to.equal(instance);
      });
    });
  });
});
