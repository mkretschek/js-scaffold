define([
  'src/getfileextension'
], function (
  getFileExtension
) {
  describe('getFileExtension()', function () {
    it('is a function', function () {
      expect(getFileExtension).to.be.a('function');
    });

    it('works with a filename', function () {
      expect(getFileExtension('foo.ext')).to.equal('ext');
      expect(getFileExtension('ext.foo')).to.equal('foo');
    });

    it('works with a path', function () {
      expect(getFileExtension('/foo/bar/baz.ext')).to.equal('ext');
    });
    
    it('works with a simple URL', function () {
      expect(getFileExtension('http://www.foo.bar/file.ext')).to.equal('ext');
    });

    it('works with a relative URL', function () {
      expect(getFileExtension('foo/bar.ext')).to.equal('ext');
      expect(getFileExtension('foo/bar.baz')).to.equal('baz');
    });

    it('works with a URL with hash', function () {
      var url = 'http://www.foo.bar/baz.ext#foobar';
      expect(getFileExtension(url)).to.equal('ext');
    });

    it('works with a URL with url-encoded data', function () {
      var url = 'http://www.foo.bar/baz.ext?foo=bar';
      expect(getFileExtension(url)).to.equal('ext');
    });

    it('returns null if no extension is found', function () {
      var url = 'http://www.foo.bar/baz';
      expect(getFileExtension(url)).to.be.null;
      expect(getFileExtension('foobar')).to.be.null;
      expect(getFileExtension('./foo/bar/baz')).to.be.null;
    });
  });
});
