define([
  'src/uri'
], function (
  URI
) {
  describe('URI()', function () {
    it('is a function', function () {
      expect(URI).to.be.a('function');
    });


    it('is a constructor', function () {
      expect(new URI()).to.be.instanceof(URI);
    });


    it('works without the \'new\' keyword', function () {
      expect(URI()).to.be.instanceof(URI);
    });


    describe('with a string', function () {
      var testUri = 'http://www.foo.bar/baz';

      beforeEach(function () {
        sinon.stub(URI, 'parse');
        URI.parse.reset();
      });

      afterEach(function () {
        URI.parse.restore();
      });

      it('parses the string', function () {
        URI(testUri);
        expect(URI.parse).to.have.been.calledWith(testUri);
      });

      it('extends the new instance with data from the given uri', function () {
        URI.parse.returns({
          scheme : 'http',
          authority : 'www.foo.bar',
          path : '/baz'
        });

        var uri = URI(testUri);
        expect(uri.scheme).to.equal('http');
        expect(uri.authority).to.equal('www.foo.bar');
        expect(uri.path).to.equal('/baz');
      });
    }); // with a string


    describe('with an object', function () {
      it('extends the new instance with data from the object', function () {
        var uri = URI({
          scheme : 'http',
          authority : 'foo.bar'
        });

        expect(uri.scheme).to.equal('http');
        expect(uri.authority).to.equal('foo.bar');
      });
    }); // with an object



    describe('data attribute', function () {
      var
        ATTRIBUTES,
        attr,
        len,
        i;

      ATTRIBUTES = [
        'scheme',
        'authority',
        'path',
        'query',
        'fragment',
        'userinfo',
        'ip',
        'ipv4',
        'ipv6',
        'hostname'
      ];

      for (i = 0, len = ATTRIBUTES.length; i < len; i += 1) {
        attr = ATTRIBUTES[i];

        describe('.' + attr, function () {
          it('is accessible', function () {
            var uri = URI();
            expect(uri[attr]).not.to.be.undefined;
          });


          it('is null by default', function () {
            var uri = URI();
            expect(uri[attr]).to.be.null;
          });
        });
      }

    }); // data attributes


    describe('.parseAuthority()', function () {
      it('is accessible', function () {
        expect(URI.parseAuthority).to.exist;
      });

      it('is a function', function () {
        expect(URI.parseAuthority).to.be.a('function');
      });

      it('parses user info', function () {
        var result = URI.parseAuthority('user:info@localhost');
        expect(result.userinfo).to.be.defined;
        expect(result.userinfo).to.equal('user:info');
      });

      it('parses hostname', function () {
        var
          withTld,
          localhost,
          withSubdomain;

        withTld = URI.parseAuthority('userinfo@foo.bar:80');
        localhost = URI.parseAuthority('userinfo@localhost:80');
        withSubdomain = URI.parseAuthority('userinfo@baz.foo.bar:80');

        expect(withTld.hostname).to.equal('foo.bar');
        expect(localhost.hostname).to.equal('localhost');
        expect(withSubdomain.hostname).to.equal('baz.foo.bar');

        expect(withTld.ip).to.be.undefined;
        expect(localhost.ip).to.be.undefined;
        expect(withSubdomain.ip).to.be.undefined;
      });

      it('parses ipv4', function () {
        var result = URI.parseAuthority('userinfo@127.0.0.1:80');
        expect(result.ipv4).to.equal('127.0.0.1');
        expect(result.ip).to.equal(result.ipv4);
        expect(result.ipv6).to.be.undefined;
        expect(result.hostname).to.be.undefined;
      });

      it('parses ipv6', function () {
        var result = URI.parseAuthority('userinfo@[ffff::ffff]:80');
        expect(result.ipv6).to.equal('ffff::ffff');
        expect(result.ip).to.equal(result.ipv6);
        expect(result.ipv4).to.be.undefined;
        expect(result.hostname).to.be.undefined;
      });

      it('parses port', function () {
        var
          withHostname,
          withIPv4,
          withIPv6;

        withHostname = URI.parseAuthority('localhost:80');
        withIPv4 = URI.parseAuthority('127.0.0.1:80');
        withIPv6 = URI.parseAuthority('[ffff::ffff]:80');

        expect(withHostname.port).to.equal(80);
        expect(withIPv4.port).to.equal(80);
        expect(withIPv6.port).to.equal(80);

        expect(withHostname.port).to.be.a('number');
        expect(withIPv4.port).to.be.a('number');
        expect(withIPv6.port).to.be.a('number');
      });

      it('returns an object', function () {
        expect(URI.parseAuthority('userinfo@foo.bar:80')).to.be.an('object');
        expect(URI.parseAuthority('')).to.be.an('object');
        expect(URI.parseAuthority()).to.be.an('object');
      });
    }); // .parseAuthority()


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    describe('.parseQueryString()', function () {

      var qString = 'foo=foo1&bar=bar&baz=baz&foo=foo2';

      it('is accessible', function () {
        expect(URI.parseQueryString).to.exist;
      });

      it('is a function', function () {
        expect(URI.parseQueryString).to.be.a('function');
      });

      it('sets an array of values for each key', function () {
        var query = URI.parseQueryString(qString);
        expect(query.foo).to.be.instanceof(Array);
        expect(query.bar).to.be.instanceof(Array);
        expect(query.baz).to.be.instanceof(Array);
      });

      it('allows the occurrence of the equal sign (\'=\') in the value',
        function () {
          var query = URI.parseQueryString('foo=bar=baz');
          expect(query.foo).to.eql(['bar=baz']);
        });

      it('allows multiple values for the same key', function () {
        var query = URI.parseQueryString(qString);
        expect(query.foo).to.have.length(2);
        expect(query.bar).to.have.length(1);
        expect(query.baz).to.have.length(1);
        expect(query.foo).to.eql(['foo1', 'foo2']);
      });

      it('sets an empty array for the key if it has no assignment',
        function () {
          var query = URI.parseQueryString('foo&bar=bar');
          expect(query.foo).to.have.length(0);
          expect(query.bar).to.have.length(1);
        });

      it('sets an empty string as value if it has no value assigned',
        function () {
          var query = URI.parseQueryString('foo=&bar=bar');
          expect(query.foo).to.have.length(1);
          expect(query.foo).to.eql(['']);
          expect(query.bar).to.have.length(1);
          expect(query.bar).to.eql(['bar']);
        });

      it('returns an object', function () {
        expect(URI.parseQueryString('foo&bar=bar')).to.be.an('object');
      });

      it('returns an object if the querystring is empty', function () {
        expect(URI.parseQueryString('')).to.be.an('object');
      });

      it('returns an empty object if no querystring is given', function () {
        expect(URI.parseQueryString()).to.be.an('object');
        expect(URI.parseQueryString()).to.eql({});
        expect(URI.parseQueryString(null)).to.be.an('object');
        expect(URI.parseQueryString(null)).to.eql({});
      });
    }); // .parseQueryString()



    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    describe('.parse()', function () {
      var
        sampleUri,
        parsedUri;

      sampleUri = 'http://userinfo@localhost:80/path?q=foo#fragment';

      beforeEach(function () {
        parsedUri = URI.parse(sampleUri);
      });

      it('is accessible', function () {
        expect(URI.parse).to.be.defined;
      });

      it('is a function', function () {
        expect(URI.parse).to.be.a('function');
      });

      it('parses the authority', function () {
        expect(parsedUri.authority).to.be.defined;
        expect(parsedUri.authority).to.equal('userinfo@localhost:80');
        expect(parsedUri.userinfo).to.be.defined;
        expect(parsedUri.userinfo).to.equal('userinfo');
        expect(parsedUri.hostname).to.be.defined;
        expect(parsedUri.hostname).to.equal('localhost');
        expect(parsedUri.port).to.be.defined;
        expect(parsedUri.port).to.equal(80);
      });

      it('parses the scheme (protocol)', function () {
        expect(parsedUri.scheme).to.be.defined;
        expect(parsedUri.scheme).to.equal('http');
      });

      it('parses the path', function () {
        expect(parsedUri.path).to.be.defined;
        expect(parsedUri.path).to.equal('/path');
      });

      it('parses the query', function () {
        expect(parsedUri.query).to.be.defined;
        expect(parsedUri.query).to.be.an('object');
        expect(parsedUri.query).to.eql({q : ['foo']});
      });

      it('parses the fragment', function () {
        expect(parsedUri.fragment).to.be.defined;
        expect(parsedUri.fragment).to.equal('fragment');
      });

      it('returns an object', function () {
        expect(URI.parse('')).to.be.an('object');
        expect(URI.parse('')).to.eql({});

        expect(URI.parse()).to.be.an('object');
        expect(URI.parse()).to.eql({});
      });
    }); // .parse()
  });
});
