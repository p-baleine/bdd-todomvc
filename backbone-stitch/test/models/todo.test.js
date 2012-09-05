var should = require('should')
  , sinon = require('sinon')
  , Backbone = require('backbone')
  , Todo = require('../../lib/models/todo');

describe('Todo model', function() {
  before(function() {
    this.todo = new Todo();
    this.todo.collection = { url: '/collection url' };
  });

  describe('instantiation', function() {
    it ('should extend Backbone.Model', function() {
      this.todo.should.be.an.instanceOf(Backbone.Model);
    });

    it ('should set default priority', function() {
      this.todo.get('priority').should.equal(3);
    });
  });

  describe('URL', function() {
    describe('when model\'s id is not specified', function() {
      it ('should take over url from its collection', function() {
        this.todo.url().should.eql('/collection url');
      });
    });

    describe('when model\'s id is specified', function() {
      it ('should have url with id', function() {
        this.todo.id = 3;
        this.todo.url().should.eql('/collection url/3');
      });
    });
  });

  describe('validation', function() {
    it ('should not saved without title', function() {
      var spy = sinon.spy();
      this.todo.on('error', spy);
      this.todo.save({ title: '' });

      spy.calledOnce.should.be.ok;
      spy.args[0][1].should.be.eql('title should be specified');
    });
  });
});