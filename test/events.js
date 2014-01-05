define([
  'src/events/event',
  'src/events',
  'chai',
  'sinon',

  'test/events/event',
  'test/events/eventtype'
], function (
  Event,
  events,
  chai
) {
  describe('events', function () {
    var
      target,
      listener = sinon.spy(function () {}),
      listen = events.listen,
      listenOnce = events.listenOnce,
      trigger = events.trigger,
      unlisten = events.unlisten,
      getListeners = events.getListeners;

    beforeEach(function () {
      target = {};
      listener.reset();
      unlisten();
    });

    after(function () {
      unlisten();
    });

    describe('.listen()', function () {
      it('is accessible', function () {
        expect(listen).to.exist;
      });

      it('is a function', function () {
        expect(listen).to.be.a('function');
      });

      it('adds a listener for the given event and object', function () {
        var listeners;
        expect(getListeners(target, 'foo')).to.be.undefined;
        listen(target, 'foo', listener);

        listeners = getListeners(target, 'foo');
        expect(listeners).to.not.be.undefined;
        expect(listeners).to.have.length(1);
        expect(listeners[0].fn).to.equal(listener);
      });

      it('does not add a listener if it was already added', function () {
        var listeners1, listeners2;

        listen(target, 'foo', listener);
        listeners1 = getListeners(target, 'foo').slice(0); // copy listeners
        expect(listeners1).to.have.length(1);

        listen(target, 'foo', listener);
        listeners2 = getListeners(target, 'foo');
        expect(listeners1).to.eql(listeners2);
        expect(listeners2).to.have.length(1);
      });

      it('preserves the order in which the listeners are added', function () {
        var
          listener2 = function () {},
          listeners;

        listen(target, 'foo', listener);
        listen(target, 'foo', listener2);
        listeners = getListeners(target, 'foo');

        expect(listeners).to.have.length(2);
        expect(listeners[0].fn).to.equal(listener);
        expect(listeners[1].fn).to.equal(listener2);
      });

      it('does not set the "once" flag on listeners', function () {
        var listeners;
        listen(target, 'foo', listener);
        listeners = getListeners(target, 'foo');
        expect(listeners[0].once).to.be.undefined;
      });

      it('throws an error if no event type is given');
      it('throws an error if no target is given');
      it('throws an error if no listener is given');
    }); // .listen()

    describe('.listenOnce()', function () {
      it('is accessible', function () {
        expect(listenOnce).to.exist;
      });

      it('is a function', function () {
        expect(listenOnce).to.be.a('function');
      });

      it('sets the "once" flag on listeners to true', function () {
        listenOnce(target, 'foo', listener);
        var ls = getListeners(target, 'foo');
        expect(ls[0].once).to.be.true;
      });
    }); // .listenOnce()

    describe('.unlisten()', function () {
      var
        t1 = {},
        t2 = {},
        fn1 = function () {},
        fn2 = function () {},
        fn3 = function () {};

      it('is accessible', function () {
        expect(unlisten).to.exist;
      });

      it('is a function', function () {
        expect(unlisten).to.be.a('function');
      });

      describe('with all arguments', function () {
        it('removes the listener for the event on the target', function () {
          listen(t1, 'foo', fn1);

          unlisten(t1, 'foo', fn1);
          expect(getListeners(t1, 'foo')).to.be.undefined;
        });

        it('keeps other listeners for the event on the target', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'foo', fn2);
          unlisten(t1, 'foo', fn1);

          var ls = getListeners(t1, 'foo');
          expect(ls).to.have.length(1);
          expect(ls[0].fn).to.equal(fn2);
        });

        it('keeps the listener for other events', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'bar', fn1);
          unlisten(t1, 'foo', fn1);

          var ls = getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });

        it('keeps listener for other targets', function () {
          listen(t1, 'foo', fn1);
          listen(t2, 'foo', fn1);

          var ls = getListeners(t2, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with all arguments

      describe('with target and event', function () {
        it('removes all listeners for the event on the target', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'foo', fn2);
          listen(t1, 'foo', fn3);

          unlisten(t1, 'foo');
          var ls = getListeners(t1, 'foo');
          expect(ls).to.be.undefined;
        });

        it('keeps listeners for other events on the target', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'bar', fn1);

          unlisten(t1, 'foo');
          var ls = getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });

        it('keeps listeners for the event on other targets', function () {
          listen(t2, 'foo', fn1);

          unlisten(t1, 'foo');
          var ls = getListeners(t2, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with target and event

      describe('with target and listener', function () {
        it('removes the listener from all events on the given target',
          function () {
            listen(t1, 'foo', fn1);
            listen(t1, 'bar', fn1);
            unlisten(t1, null, fn1);

            expect(getListeners(t1, 'foo')).to.be.undefined;
            expect(getListeners(t1, 'bar')).to.be.undefined;
          });

        it('keeps the listener on other targets', function () {
          listen(t1, 'foo', fn1);
          listen(t2, 'foo', fn1);
          unlisten(t1, null, fn1);
          expect(getListeners(t2, 'foo')).to.have.length(1);
        });

        it('keeps other listeners on the target', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'foo', fn2);
          listen(t1, 'bar', fn1);
          listen(t1, 'bar', fn2);
          unlisten(t1, null, fn1);
          expect(getListeners(t1, 'foo')).to.have.length(1);
          expect(getListeners(t1, 'foo')[0].fn).to.not.equal(fn1);
          expect(getListeners(t1, 'bar')).to.have.length(1);
          expect(getListeners(t1, 'bar')[0].fn).to.not.equal(fn1);
        });
      }); // with target and listener

      describe('with target only', function () {
        it('removes all listeners for all events on the target', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'foo', fn2);
          listen(t1, 'bar', fn3);

          unlisten(t1);

          var
            ls1 = getListeners(t1, 'foo'),
            ls2 = getListeners(t1, 'bar');
          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
        });

        it('keeps listeners on other targets', function () {
          listen(t1, 'foo', fn1);
          listen(t2, 'foo', fn1);

          unlisten(t1);

          var ls = getListeners(t2, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with target only

      describe('with event and listener', function () {
        it('removes the listener for the event on all targets', function () {
          listen(t1, 'foo', fn1);
          listen(t2, 'foo', fn1);

          unlisten(null, 'foo', fn1);
          
          var
            ls1 = getListeners(t1, 'foo'),
            ls2 = getListeners(t2, 'foo');

          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
        });

        it('keeps other listeners on the targets', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'foo', fn2);

          unlisten(null, 'foo', fn1);
          var ls = getListeners(t1, 'foo');
          expect(ls).to.have.length(1);
          expect(ls[0].fn).to.equal(fn2);
        });

        it('keeps the listener on other events', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'bar', fn1);

          unlisten(null, 'foo', fn1);
          var ls = getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });
      }); // with event and listener

      describe('with eventType only', function () {
        it('removes all listeners for the event on all its targets',
          function () {
            listen(t1, 'foo', fn1);
            listen(t1, 'foo', fn2);
            listen(t2, 'foo', fn3);

            unlisten(null, 'foo');

            var
              ls1 = getListeners(t1, 'foo'),
              ls2 = getListeners(t2, 'foo');

            expect(ls1).to.be.undefined;
            expect(ls2).to.be.undefined;
          });

        it('keeps listeners on other events', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'bar', fn2);

          unlisten(null, 'foo');
          var ls = getListeners(t1, 'bar');
          expect(ls).to.have.length(1);
        });
      }); // with event only

      describe('with listener only', function () {
        it('removes the listener from all events on all targets', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'bar', fn1);
          listen(t2, 'foo', fn1);

          unlisten(null, null, fn1);
          
          var
            ls1 = getListeners(t1, 'foo'),
            ls2 = getListeners(t1, 'bar'),
            ls3 = getListeners(t2, 'foo');

          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
          expect(ls3).to.be.undefined;
        });

        it('keeps other listeners', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'foo', fn2);

          unlisten(null, null, fn1);
          var ls = getListeners(t1, 'foo');
          expect(ls).to.have.length(1);
        });
      }); // with listener only

      describe('without any arguments', function () {
        it('removes all listeners for all events', function () {
          listen(t1, 'foo', fn1);
          listen(t1, 'foo', fn2);
          listen(t1, 'bar', fn1);
          listen(t2, 'foo', fn2);
          listen(t2, 'baz', fn3);

          unlisten();
          
          var
            ls1 = getListeners(t1, 'foo'),
            ls2 = getListeners(t1, 'bar'),
            ls3 = getListeners(t2, 'foo'),
            ls4 = getListeners(t2, 'baz');

          expect(ls1).to.be.undefined;
          expect(ls2).to.be.undefined;
          expect(ls3).to.be.undefined;
          expect(ls4).to.be.undefined;
        });

        it('resets the event data object', function () {
          var oldListeners = getListeners();
          unlisten();
          expect(oldListeners).to.not.equal(getListeners());
        });
      }); // without any arguments
    }); // .unlisten()

    describe('.trigger()', function () {
      var
        listener2 = sinon.spy(function () {}),
        listener3 = sinon.spy(function () {});

      beforeEach(function () {
        listen(target, 'foo', listener);
        listener2.reset();
        listener3.reset();
      });

      it('is accessible', function () {
        expect(trigger).to.exist;
      });

      it('is a function', function () {
        expect(trigger).to.be.a('function');
      });

      it('executes all listeners for the event on the target', function () {
        listen(target, 'foo', listener2);

        trigger(target, 'foo');
        expect(listener).to.have.been.calledOnce;
        expect(listener2).to.have.been.calledOnce;
      });

      it('executes listeners in the order they are registered', function () {
        listen(target, 'foo', listener3);
        listen(target, 'foo', listener2);

        trigger(target, 'foo');
        expect(listener).to.have.been.calledBefore(listener3);
        expect(listener3).to.have.been.calledBefore(listener2);
        expect(listener2).to.have.been.called;

        expect(listener).to.have.been.calledOnce;
        expect(listener2).to.have.been.calledOnce;
        expect(listener3).to.have.been.calledOnce;
      });

      it('removes listeners flaged to be executed only once', function () {
        listenOnce(target, 'foo', listener2);

        trigger(target, 'foo');
        var ls = getListeners(target, 'foo');
        expect(ls).to.have.length(1);
        expect(listener).to.have.been.calledOnce;
        expect(listener2).to.have.been.calledOnce;

        trigger(target, 'foo');
        expect(listener).to.have.been.calledTwice;
        expect(listener2).to.have.been.calledOnce;
      });

      it('passes an event object as the first parameter to the listener',
        function () {
          trigger(target, 'foo');
          expect(listener.lastCall.args[0]).to.be.instanceof(Event);
        });

      it('sets the event\'s target property', function () {
        trigger(target, 'foo');
        var e = listener.lastCall.args[0];
        expect(e).to.have.property('target');
        expect(e.target).to.equal(target);
      });

      it('passes additional arguments to the listener', function () {
        trigger(target, 'foo', ['bar', 'baz']);
        expect(listener.lastCall.args[1]).to.equal('bar');
        expect(listener.lastCall.args[2]).to.equal('baz');
      });
    }); // .trigger()
  });
});
