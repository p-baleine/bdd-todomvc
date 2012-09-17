var should = require('should')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , fixtures = require('./fixtures');

/**
 * Mock model
 */
var Todo = function() {};

Todo.find = function(pred, cb) {
  return cb(null, fixtures.todos);
};

Todo.findOne = function(pred, cb) {
  return cb(null, new Todo());
};

Todo.prototype.save = function(cb) {
  cb(null, { content: 'saved', _id: 'XXX' });
  return this;
};

var todos;

describe('todos resource', function() {
  before(function() {
    this.Todo = Todo;
    sinon.spy(this, 'Todo');
    mockery.registerMock('../models/todo', this.Todo);
    mockery.registerAllowable('../resources/todos');
    mockery.enable();
    todos = require('../resources/todos');
  });

  after(function() {
    this.Todo.restore();
    mockery.deregisterMock('../models/todo');
    mockery.registerAllowable('../resources/todos');
    mockery.disable();
  });

  describe('index', function() {
    after(function() {
      this.Todo.find.restore();
    });

    it('should define `index`', function() {
      todos.index.should.be.an.instanceOf(Function);
    });

    it('should send all todos', function() {
      var req
        , res = { send: sinon.spy() };

      sinon.spy(this.Todo, 'find');

      todos.index(req, res);

      this.Todo.find.calledOnce.should.be.ok;
      res.send.calledOnce.should.be.ok;
      res.send.args[0][0].should.eql({
        'data': fixtures.todos
      });
    });
  });

  describe('create', function() {
    before(function() {
      this.req = { body: { content: 'abcde' } };
      this.res = { send: sinon.spy() };

      sinon.spy(this.Todo.prototype, 'save');

      todos.create(this.req, this.res);
    });

    after(function() {
      this.Todo.prototype.save.restore();
    });

    it('should define `create`', function() {
      todos.create.should.be.an.instanceOf(Function);
    });

    it('should instantiate new todo', function() {
      this.Todo.calledOnce.should.be.ok;
      this.Todo.args[0][0].should.eql({ content: 'abcde' });
    });

    it('should save new todo', function() {
      this.Todo.prototype.save.calledOnce.should.be.ok;
    });

    it('should send saved todo', function() {
      this.res.send.calledOnce.should.be.ok;
      this.res.send.args[0][0].should.eql({ content: 'saved', _id: 'XXX' });
    });
  });

  describe('update', function() {
    before(function() {
      this.req = { body: { _id: 'hoge', content: 'abcde' } };
      this.res = { send: sinon.spy() };

      sinon.spy(this.Todo, 'findOne');
      sinon.spy(this.Todo.prototype, 'save');

      todos.update(this.req, this.res);
    });

    after(function() {
      this.Todo.findOne.restore();
      this.Todo.prototype.save.restore();
    });

    it('should define `update`', function() {
      todos.update.should.be.an.instanceOf(Function);
    });

    it('should find a todo whose `_id` corresponds to requested', function() {
      this.Todo.findOne.calledOnce.should.be.ok;
      this.Todo.findOne.args[0][0].should.eql({ _id: 'hoge' });
    });

    it('should save a todo whose `_id` corresponds to requested', function() {
      this.Todo.prototype.save.calledOnce.should.be.ok;
    });

    it('should send saved todo', function() {
      this.res.send.calledOnce.should.be.ok;
      this.res.send.args[0][0].should.eql({ content: 'saved', _id: 'XXX' });
    });
  });
});