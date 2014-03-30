define([
  'src/event',
  'src/eventhandler',
  'src/datastorage'
], function (
  Event,
  EventHandler,
  DataStorage
) {
  describe('EventHandler constructor', function () {
    var
      target,
      listener = sinon.spy(function () {}),
      storage,
      handler;

    beforeEach(function () {
      target = {};
      listener.reset();
      storage = new DataStorage();
      handler = new EventHandler(storage);
    });

    it('is a constructor', function () {
      expect(handler).to.be.instanceof(EventHandler);
    });

    it('allows setting a data storage', function () {
      var
        storage2 = new DataStorage(),
        handler2 = new EventHandler(storage2);

      expect(handler2.dataStorage).to.not.equal(handler.dataStorage);

      expect(storage2.get()).to.be.empty;
      handler2.listen(target, 'foo', listener);
      expect(storage2.get()).to.not.be.empty;
      expect(storage.get()).to.be.empty;
    });

    it('creates a new data storage if none is given', function () {
      var handler2 = new EventHandler();
      expect(handler2.dataStorage).to.exist;
      expect(handler2.dataStorage).to.be.instanceof(DataStorage);
      expect(handler2.dataStorage).to.not.equal(handler.dataStorage);

      expect(handler2.dataStorage.get()).to.be.empty;
      handler2.listen(target, 'foo', listener);
      expect(handler2.dataStorage.get()).to.not.be.empty;
    });

    describe('#listen()', function () {
      it('is accessible', function () {
        expect(handler.listen).to.exist;
      });

      it('is a function', function () {
        expect(handler.listen).to.be.a('function');
      });

      it('adds a listener for the given event and object', function () {
        var listeners;
        expect(handler.getListeners(target, 'foo')).to.be.undefined;
        handler.listen(target, 'foo', listener);

        listeners = handler.getListeners(target, 'foo');
        expect(listeners).to.not.be.undefined;
        expect(listeners).to.have.length(1);
        expect(listeners[0].fn).to.equal(listener);
      });

      it('does not add a listener if it was already added', function () {
        var listeners1, listeners2;

        handler.listen(target, 'foo', listener);
        listeners1 = handler.getListeners(target, 'foo').slice(0); // copy listeners
        expect(listeners1).to.have.length(1);

        handler.listen(target, 'foo', listener);
        listeners2 = handler.getListeners(target, 'foo');
        expect(listeners1).to.eql(listeners2);
        expect(listeners2).to.have.length(1);
      });

      it('preserves the order in which the listeners are added', function () {
        var
          listener2 = function () {},
          listeners;

        handler.listen(target, 'foo', listener);
        handler.listen(target, 'foo', listener2);
        listeners = handler.getListeners(target, 'foo');

        expect(listeners).to.have.length(2);
        expect(listeners[0].fn).to.equal(listener);
        expect(listeners[1].fn).to.equal(listener2);
      });

      it('does not set the "once" flag on listeners', function () {
        var listeners;
        handler.listen(target, 'foo', listener);
        listeners = handler.getListeners(target, 'foo');
        expect(listeners[0].once).to.be.undefined;
      });
    }); // .listen()

    describe('#listenOnce()', function () {
      it('is accessible', function () {
        expect(handler.listenOnce).to.exist;
      });

      it('is a function', function () {
        expect(handler.listenOnce).to.be.a('function');
      });

      it('sets the "once" flag on listeners to true', function () {
        handler.listenOnce(target, 'foo', listener);
        var ls = handler.getListeners(target, 'foo');
        expect(ls[0].once).to.be.true;
      });
    }); // .listenOnce()

    describe('#unlisten()', function () {
      var
        t1 = {},
        t2 = {},
        fn1 = function () {},
        fn2 = function () {},
        fn3 = function () {};

      it('is accessible', function () {
        expect(handler.unlisten).to.exist;
      });

      it('is a function', function () {
        expect(handler.unlisten).to.be.a('function');
      });

      describe('with all arguments', function () {
        it('removes the listener for the event on the target', function () {
          handler.listen(t1, 'foo', fn1);

          handler.unlisten(t1, 'foo', fn1);
          expect(handler.getListeners(t1, 'foo')).to.be.undefined;
        });

        it('keeps other listeners for the event on the target', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'foo', fn2);
          handler.unlisten(t1, 'foo', fn1);

          var ls = handler.getListeners(t1, 'foo');
          expect(ls).to.have.length(1);
          expect(ls[0].fn).to.equal(fn2);
        });

        it('keeps the listener for other events', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'bar', fn1);
          handler.unlisten(t1, 'foo', fn1);

          var ls = handler.getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });

        it('keeps listener for other targets', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t2, 'foo', fn1);

          var ls = handler.getListeners(t2, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with all arguments

      describe('with target and event', function () {
        it('removes all listeners for the event on the target', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'foo', fn2);
          handler.listen(t1, 'foo', fn3);

          handler.unlisten(t1, 'foo');
          var ls = handler.getListeners(t1, 'foo');
          expect(ls).to.be.undefined;
        });

        it('keeps listeners for other events on the target', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'bar', fn1);

          handler.unlisten(t1, 'foo');
          var ls = handler.getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });

        it('keeps listeners for the event on other targets', function () {
          handler.listen(t2, 'foo', fn1);

          handler.unlisten(t1, 'foo');
          var ls = handler.getListeners(t2, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with target and event

      describe('with target and listener', function () {
        it('removes the listener from all events on the given target',
          function () {
            handler.listen(t1, 'foo', fn1);
            handler.listen(t1, 'bar', fn1);
            handler.unlisten(t1, null, fn1);

            expect(handler.getListeners(t1, 'foo')).to.be.undefined;
            expect(handler.getListeners(t1, 'bar')).to.be.undefined;
          });

        it('keeps the listener on other targets', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t2, 'foo', fn1);
          handler.unlisten(t1, null, fn1);
          expect(handler.getListeners(t2, 'foo')).to.have.length(1);
        });

        it('keeps other listeners on the target', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'foo', fn2);
          handler.listen(t1, 'bar', fn1);
          handler.listen(t1, 'bar', fn2);
          handler.unlisten(t1, null, fn1);
          expect(handler.getListeners(t1, 'foo')).to.have.length(1);
          expect(handler.getListeners(t1, 'foo')[0].fn).to.not.equal(fn1);
          expect(handler.getListeners(t1, 'bar')).to.have.length(1);
          expect(handler.getListeners(t1, 'bar')[0].fn).to.not.equal(fn1);
        });
      }); // with target and listener

      describe('with target only', function () {
        it('removes all listeners for all events on the target', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'foo', fn2);
          handler.listen(t1, 'bar', fn3);

          handler.unlisten(t1);

          var
            ls1 = handler.getListeners(t1, 'foo'),
            ls2 = handler.getListeners(t1, 'bar');
          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
        });

        it('keeps listeners on other targets', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t2, 'foo', fn1);

          handler.unlisten(t1);

          var ls = handler.getListeners(t2, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with target only

      describe('with event and listener', function () {
        it('removes the listener for the event on all targets', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t2, 'foo', fn1);

          handler.unlisten(null, 'foo', fn1);
          
          var
            ls1 = handler.getListeners(t1, 'foo'),
            ls2 = handler.getListeners(t2, 'foo');

          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
        });

        it('keeps other listeners on the targets', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'foo', fn2);

          handler.unlisten(null, 'foo', fn1);
          var ls = handler.getListeners(t1, 'foo');
          expect(ls).to.have.length(1);
          expect(ls[0].fn).to.equal(fn2);
        });

        it('keeps the listener on other events', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'bar', fn1);

          handler.unlisten(null, 'foo', fn1);
          var ls = handler.getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });
      }); // with event and listener

      describe('with eventType only', function () {
        it('removes all listeners for the event on all its targets',
          function () {
            handler.listen(t1, 'foo', fn1);
            handler.listen(t1, 'foo', fn2);
            handler.listen(t2, 'foo', fn3);

            handler.unlisten(null, 'foo');

            var
              ls1 = handler.getListeners(t1, 'foo'),
              ls2 = handler.getListeners(t2, 'foo');

            expect(ls1).to.be.undefined;
            expect(ls2).to.be.undefined;
          });

        it('keeps listeners on other events', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'bar', fn2);

          handler.unlisten(null, 'foo');
          var ls = handler.getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });
      }); // with event only

      describe('with listener only', function () {
        it('removes the listener from all events on all targets', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'bar', fn1);
          handler.listen(t2, 'foo', fn1);

          handler.unlisten(null, null, fn1);
          
          var
            ls1 = handler.getListeners(t1, 'foo'),
            ls2 = handler.getListeners(t1, 'bar'),
            ls3 = handler.getListeners(t2, 'foo');

          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
          expect(ls3).to.be.undefined;
        });

        it('keeps other listeners', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'foo', fn2);

          handler.unlisten(null, null, fn1);
          var ls = handler.getListeners(t1, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with listener only

      describe('without any arguments', function () {
        it('removes all listeners for all events', function () {
          handler.listen(t1, 'foo', fn1);
          handler.listen(t1, 'foo', fn2);
          handler.listen(t1, 'bar', fn1);
          handler.listen(t2, 'foo', fn2);
          handler.listen(t2, 'baz', fn3);

          handler.unlisten();
          
          var
            ls1 = handler.getListeners(t1, 'foo'),
            ls2 = handler.getListeners(t1, 'bar'),
            ls3 = handler.getListeners(t2, 'foo'),
            ls4 = handler.getListeners(t2, 'baz');

          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
          expect(ls3).to.be.undefined;
          expect(ls4).to.be.undefined;
        });

        it('resets the event data object', function () {
          var oldListeners = handler.getListeners();
          handler.unlisten();
          expect(oldListeners).to.not.equal(handler.getListeners());
        });
      }); // without any arguments
    }); // .unlisten()

    describe('#trigger()', function () {
      var
        listener2 = sinon.spy(function () {}),
        listener3 = sinon.spy(function () {});

      beforeEach(function () {
        handler.listen(target, 'foo', listener);
        listener2.reset();
        listener3.reset();
      });

      it('is accessible', function () {
        expect(handler.trigger).to.exist;
      });

      it('is a function', function () {
        expect(handler.trigger).to.be.a('function');
      });

      it('executes all listeners for the event on the target', function () {
        handler.listen(target, 'foo', listener2);

        handler.trigger(target, 'foo');
        expect(listener).to.have.been.calledOnce;
        expect(listener2).to.have.been.calledOnce;
      });

      it('executes listeners in the order they are registered', function () {
        handler.listen(target, 'foo', listener3);
        handler.listen(target, 'foo', listener2);

        handler.trigger(target, 'foo');
        expect(listener).to.have.been.calledBefore(listener3);
        expect(listener3).to.have.been.calledBefore(listener2);
        expect(listener2).to.have.been.called;

        expect(listener).to.have.been.calledOnce;
        expect(listener2).to.have.been.calledOnce;
        expect(listener3).to.have.been.calledOnce;
      });

      it('removes listeners flaged to be executed only once', function () {
        handler.listenOnce(target, 'foo', listener2);

        handler.trigger(target, 'foo');
        var ls = handler.getListeners(target, 'foo');
        expect(ls).to.have.length(1);
        expect(listener).to.have.been.calledOnce;
        expect(listener2).to.have.been.calledOnce;

        handler.trigger(target, 'foo');
        expect(listener).to.have.been.calledTwice;
        expect(listener2).to.have.been.calledOnce;
      });

      it('passes an event object as the first parameter to the listener',
        function () {
          handler.trigger(target, 'foo');
          expect(listener.lastCall.args[0]).to.be.instanceof(Event);
        });

      it('sets the event\'s target property', function () {
        handler.trigger(target, 'foo');
        var e = listener.lastCall.args[0];
        expect(e).to.have.property('target');
        expect(e.target).to.equal(target);
      });

      it('passes additional arguments to the listener', function () {
        handler.trigger(target, 'foo', ['bar', 'baz']);
        expect(listener.lastCall.args[1]).to.equal('bar');
        expect(listener.lastCall.args[2]).to.equal('baz');
      });
    }); // .trigger()
  });
});
