define([
  'src/datastorage'
], function (
  DataStorage
) {
  describe('DataStorage', function () {
    var
      target = {},
      data;

    beforeEach(function () {
      data = new DataStorage();
    });

    it('is a constructor', function () {
      expect(data).to.be.instanceof(DataStorage);
    });

    it('creates a new storage object on instantiation', function () {
      var data2 = new DataStorage();
      expect(data._storage).to.not.be.equal(data2._storage);
    });

    describe('#set()', function () {
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

        data.set(target, 'foo', 'foobarbaz');
        expect(target).to.eql(copy);
      });

      it('sets the data on the target object', function () {
        var storage = data.get();
        expect(storage).to.be.empty;
        data.set(target, 'foo', 'foobarbaz');
        expect(storage).to.not.be.empty;
        expect(data.get(target, 'foo')).to.equal('foobarbaz');
      });

      it('overrides previously defined data', function () {
        var storage = data.get();
        expect(storage).to.be.empty;
        data.set(target, 'foo', 'This will be overriden.');
        data.set(target, 'foo', 'foobarbaz');
        expect(data.get(target, 'foo')).to.equal('foobarbaz');
      });

      it('throws an error if no target object is given', function () {
        function callWithoutTarget() {
          data.set(null, 'foo', 'foobarbaz');
        }

        expect(callWithoutTarget).to.throw('Invalid object');
      });

      it('throws an error if a field is not given', function () {
        function callWithoutField() {
          data.set(target, null, 'foobarbaz');
        }

        expect(callWithoutField).to.throw('Invalid field name');
      });

      it('throws an error if the field is not a string', function () {
        function callWithInvalidFieldType() {
          data.set(target, function () {}, 'foobarbaz');
        }

        expect(callWithInvalidFieldType).to.throw('Invalid field name');
      });
    }); // #set()


    describe('#get()', function () {
      it('is accessible', function () {
        expect(data.get).to.exist;
      });

      it('is a function', function () {
        expect(data.get).to.be.a('function');
      });

      describe('without arguments', function () {
        it('returns the storage object', function () {
          expect(data.get()).to.equal(data._storage);
        });
      }); // without arguments

      describe('with a target object', function () {
        it('returns an object with fields as keys and their data as values',
          function () {
            data.set(target, 'foo', 'foobarbaz');
            data.set(target, 'bar', 'barbazfoo');
            data.set(target, 'baz', 'bazfoobar');

            expect(data.get(target)).to.eql({
              foo : 'foobarbaz',
              bar : 'barbazfoo',
              baz : 'bazfoobar'
            });
          });

        it('returns undefined if the object has no data', function () {
          expect(data.get(target)).to.be.undefined;
        });
      }); // with a target object

      describe('with a field', function () {
        it('returns the storage object associated to that field',
          function () {
            data.set(target, 'foo', 'foobarbaz');
            expect(data.get(null, 'foo')).to.equal(data._storage.foo);
          });
          
        it('returns undefined if the field does not have any data',
          function () {
            expect(data.get(null, 'foo')).to.be.undefined;
          });
      }); // with a field

      describe('with an object and field', function () {
        it('returns the data associated to the object and field',
          function () {
            data.set(target, 'foo', 'foobarbaz');
            expect(data.get(target, 'foo')).to.equal('foobarbaz');
          });

        it('returns undefined if no data is found', function () {
          expect(data.get(target, 'foo')).to.be.undefined;
        });
      }); // with an object and field
    }); // #get()


    describe('#unset()', function () {
      it('is accessible', function () {
        expect(data.unset).to.exist;
      });

      it('is a function', function () {
        expect(data.unset).to.be.a('function');
      });

      describe('without arguments', function () {
        it('clears all fields from all objects', function () {
          var target2 = {};
          data.set(target, 'foo', 'foobarbaz');
          data.set(target, 'bar', 'barbazfoo');
          data.set(target2, 'foo', 'foobarbaz2');
          data.set(target2, 'bar', 'barbazfoo2');

          data.unset();
          expect(data.get(target)).to.be.undefined;
          expect(data.get(target2)).to.be.undefined;
        });

        it('creates a new storage object', function () {
          var oStorage = data.get();
          data.unset();
          expect(data.get()).to.not.equal(oStorage);
        });
      }); // without arguments

      describe('with a target object and a field', function () {
        it('removes the data for the field in the object', function () {
          data.set(target, 'foo', 'foobarbaz');
          data.unset(target, 'foo');
          expect(data.get(target, 'foo')).to.be.undefined;
        });
      }); // with a target object and a field

      describe('with a target object', function () {
        it('removes all data from the object', function () {
          data.set(target, 'foo', 'foobarbaz');
          data.set(target, 'bar', 'barbazfoo');
          data.unset(target);
          expect(data.get(target)).to.be.undefined;
        });

        it('keeps data for other objects', function () {
          var target2 = {};
          data.set(target, 'foo', 'foobarbaz');
          data.set(target2, 'foo', 'foobarbaz');
          data.unset(target);
          expect(data.get(target2, 'foo')).to.equal('foobarbaz');
        });
      }); // with a target object

      describe('with a field', function () {
        var target2 = {};

        beforeEach(function () {
          data.set(target, 'foo', 'foobarbaz');
          data.set(target, 'bar', 'barbazfoo');
          data.set(target2, 'foo', 'foobarbaz');
          data.set(target2, 'bar', 'barbazfoo');
        });
        
        it('removes the data for the field from all objects', function () {
          data.unset(null, 'foo');
          expect(data.get(target, 'foo')).to.be.undefined;
          expect(data.get(target2, 'foo')).to.be.undefined;
        });

        it('keeps data for other fields', function () {
          data.unset(null, 'foo');
          expect(data.get(target, 'bar')).to.equal('barbazfoo');
          expect(data.get(target2, 'bar')).to.equal('barbazfoo');
        });
      });
    }); // #unset()
  }); // DataStorage
});
