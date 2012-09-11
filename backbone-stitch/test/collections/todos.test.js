/**
 * Module dependencies
 */
var should = require('should')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , Backbone = require('backbone')
  , helper = require('../helper');

describe('Todos collection', function() {
  before(function() {
    // mocks
    this.Todo = Backbone.Model.extend();

    mockery.registerMock('../models/todo', this.Todo);
    helper.registerAllowables('../../lib/collections/todos');
    mockery.enable();

    // target
    this.Todos = require('../../lib/collections/todos');

    this.todos = new this.Todos();
  });

  after(function() {
    mockery.deregisterMock('../models/todo');
    helper.deregisterAllowables('../../lib/collections/todos');
    mockery.disable();
  });

  it ('should be extended from Backbone.Collection', function() {
    this.todos.should.be.an.instanceOf(Backbone.Collection);
  });

  it ('should have Todo model as its model', function() {
    this.todos.model.should.equal(this.Todo);
  });

  describe('#add()', function() {
    describe('when passed an array of object literals', function() {
      before(function() {
        sinon.spy(this.Todo.prototype, 'initialize');
        this.todos.add([{ id: 1 }, { id: 2 }, { id: 3 }]);
      });

      after(function() {
        this.Todo.prototype.initialize.restore();
      });

      it ('should create Todo model instance', function() {
        this.Todo.prototype.initialize.calledThrice.should.be.ok;
      });
    });
  });
});