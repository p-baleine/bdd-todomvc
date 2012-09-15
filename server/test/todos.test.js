var should = require('should')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , fixtures = require('./fixtures');

/**
 * Mock model
 */
var Todo = function() {
  Todo.called = Todo.calledOnce = true;
  Todo.args = [].slice.call(arguments);
};

Todo.restore = function() {
  Todo.called = Todo.calledOnce = false;
  Todo.args = null;
};

Todo.find = function(pred, cb) {
  return cb(null, fixtures.todos);
};

Todo.prototype.save = function(cb) {
  cb(null, { content: 'saved', _id: 'XXX' });
  return this;
};

var todos;

describe('todos resource', function() {
  before(function() {
    mockery.registerMock('../models/todo', Todo);
    mockery.registerAllowable('../resources/todos');
    mockery.enable();
    todos = require('../resources/todos');
  });

  after(function() {
    mockery.deregisterMock('../models/todo');
    mockery.registerAllowable('../resources/todos');
    mockery.disable();
  });

  describe('resource interface', function() {
    it('should define `index`', function() {
      todos.index.should.be.an.instanceOf(Function);
    });

    it('should define `create`', function() {
      todos.create.should.be.an.instanceOf(Function);
    });
  });

  describe('index', function() {
    after(function() {
      Todo.find.restore();
    });

    it('should send all todos', function() {
      var req
        , res = { send: sinon.spy() };

      sinon.spy(Todo, 'find');

      todos.index(req, res);

      Todo.find.calledOnce.should.be.ok;
      res.send.calledOnce.should.be.ok;
      res.send.args[0][0].should.eql({
        'data': fixtures.todos
      });
    });
  });

  describe('create', function() {
    before(function() {
      this.req = { body: { content: 'abcde' } }
      this.res = { send: sinon.spy() };

      sinon.spy(Todo.prototype, 'save');

      todos.create(this.req, this.res);
    });

    after(function() {
      Todo.restore();
      Todo.prototype.save.restore();
    });

    it('should instantiate new todo', function() {
      Todo.calledOnce.should.be.ok;
      Todo.args[0].should.eql({ content: 'abcde' });
    });

    it('should save new todo', function() {
      Todo.prototype.save.calledOnce.should.be.ok;
    });

    it('should send saved todo', function() {
      this.res.send.calledOnce.should.be.ok;
      this.res.send.args[0][0].should.eql({ content: 'saved', _id: 'XXX' });
    });
  });
});