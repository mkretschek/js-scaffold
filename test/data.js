define([
  'src/data'
], function (
  data
) {
  describe('data', function () {
    var
      target = {},
      setData = data.set,
      getData = data.get,
      unsetData = data.unset;

    beforeEach(function () {
      // Reset data
      unsetData();
    });

    it('is an object', function () {
      expect(data).to.be.an('object');
    });

    describe('.set()', function () {
      it('is accessible', function () {
        expect(data.set).to.exist;
      });

      it('is a function', function () {
        expect(data.set).to.be.a('function');
      });

      it('does not change the target object', function () {
        var
          key,
          copy = {};

        for (key in target) {
          if (target.hasOwnProperty(key)) {
            copy[key] = target[key];
          }
        }

        setData(target, 'foo', 'foobarbaz');
        expect(target).to.eql(copy);
      });

      it('sets the data on the target object', function () {
        var storage = getData();
        expect(storage).to.be.empty;
        setData(target, 'foo', 'foobarbaz');
        expect(storage).to.not.be.empty;
        expect(getData(target, 'foo')).to.equal('foobarbaz');
      });

      it('overrides previously defined data', function () {
        var storage = getData();
        expect(storage).to.be.empty;
        setData(target, 'foo', 'loremipsum');
        setData(target, 'foo', 'foobarbaz');
        expect(getData(target, 'foo')).to.equal('foobarbaz');
      });

      it('throws an error if no target object is given', function () {
        function callWithoutTarget() {
          setData(null, 'foo', 'foobarbaz');
        }

        expect(callWithoutTarget).to.throw('Invalid object');
      });

      it('throws an error if a field is not given', function () {
        function callWithoutField() {
          setData(target, null, 'foobarbaz');
        }

        expect(callWithoutField).to.throw('Invalid field name');
      });

      it('throws an error if the field is not a string', function () {
        function callWithInvalidFieldType() {
          setData(target, function () {}, 'foobarbaz');
        }

        expect(callWithInvalidFieldType).to.throw('Invalid field name');
      });
    }); // .set()

    describe('.get()', function () {
      it('is accessible', function () {
        expect(data.get).to.exist;
      });

      it('is a function', function () {
        expect(data.get).to.be.a('function');
      });

      describe('without arguments', function () {
        it('returns the storage object', function () {
          expect(getData()).to.equal(data._getStorage());
        });
      }); // without arguments

      describe('with a target object', function () {
        it('returns an object with fields as keys and their data as values',
          function () {
            setData(target, 'foo', 'foobarbaz');
            setData(target, 'bar', 'barbazfoo');
            setData(target, 'baz', 'bazfoobar');

            expect(getData(target)).to.eql({
              foo : 'foobarbaz',
              bar : 'barbazfoo',
              baz : 'bazfoobar'
            });
          });

        it('returns undefined if the object has no data', function () {
          expect(getData(target)).to.be.undefined;
        });
      }); // with a target object

      describe('with a field', function () {
        it('returns the storage object associated to that field',
          function () {
            setData(target, 'foo', 'foobarbaz');
            expect(getData(null, 'foo')).to.equal(data._getStorage().foo);
          });
          
        it('returns undefined if the field does not have any data',
          function () {
            expect(getData(null, 'foo')).to.be.undefined;
          });
      }); // with a field

      describe('with an object and field', function () {
        it('returns the data associated to the object and field',
          function () {
            setData(target, 'foo', 'foobarbaz');
            expect(getData(target, 'foo')).to.equal('foobarbaz');
          });

        it('returns undefined if no data is found', function () {
          expect(getData(target, 'foo')).to.be.undefined;
        });
      }); // with an object and field
    }); // .get()

    describe('.unset()', function () {
      it('is accessible', function () {
        expect(data.unset).to.exist;
      });

      it('is a function', function () {
        expect(data.unset).to.be.a('function');
      });

      describe('without arguments', function () {
        it('clears all fields from all objects', function () {
          var target2 = {};
          setData(target, 'foo', 'foobarbaz');
          setData(target, 'bar', 'barbazfoo');
          setData(target2, 'foo', 'foobarbaz2');
          setData(target2, 'bar', 'barbazfoo2');

          unsetData();
          expect(getData(target)).to.be.undefined;
          expect(getData(target2)).to.be.undefined;
        });

        it('creates a new storage object', function () {
          var oStorage = getData();
          unsetData();
          expect(getData()).to.not.equal(oStorage);
        });
      }); // without arguments

      describe('with a target object and a field', function () {
        it('removes the data for the field in the object', function () {
          setData(target, 'foo', 'foobarbaz');
          unsetData(target, 'foo');
          expect(getData(target, 'foo')).to.be.undefined;
        });
      }); // with a target object and a field

      describe('with a target object', function () {
        it('removes all data from the object', function () {
          setData(target, 'foo', 'foobarbaz');
          setData(target, 'bar', 'barbazfoo');
          unsetData(target);
          expect(getData(target)).to.be.undefined;
        });

        it('keeps data for other objects', function () {
          var target2 = {};
          setData(target, 'foo', 'foobarbaz');
          setData(target2, 'foo', 'foobarbaz');
          unsetData(target);
          expect(getData(target2, 'foo')).to.equal('foobarbaz');
        });
      }); // with a target object

      describe('with a field', function () {
        var target2 = {};

        beforeEach(function () {
          setData(target, 'foo', 'foobarbaz');
          setData(target, 'bar', 'barbazfoo');
          setData(target2, 'foo', 'foobarbaz');
          setData(target2, 'bar', 'barbazfoo');
        });
        
        it('removes the data for the field from all objects', function () {
          unsetData(null, 'foo');
          expect(getData(target, 'foo')).to.be.undefined;
          expect(getData(target2, 'foo')).to.be.undefined;
        });

        it('keeps data for other fields', function () {
          unsetData(null, 'foo');
          expect(getData(target, 'bar')).to.equal('barbazfoo');
          expect(getData(target2, 'bar')).to.equal('barbazfoo');
        });
      });
    }); // .unset()
  });
});
