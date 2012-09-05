var jsdom = require('jsdom')
  , should = require('should')
  , sinon = require('sinon')
  , Backbone = require('backbone')
  , TodoList = require('../../lib/views/todo-list');

var TodoItem = require('../../lib/views/todo-item');

var html = '<html><head></head><body></body></html>';

describe('TodoList view', function() {
  before(function(done) {
    jsdom.env(html, ['../../vendor/jquery.js'], function(err, window) {
      document = window.document;
      Backbone.setDomLibrary(window.$);

      this.todoList = new TodoList();
      done(err);
    }.bind(this));
  });

  describe('instantiation', function() {
    it ('should extend Backbone.View', function() {
      this.todoList.should.be.an.instanceOf(Backbone.View);
    });
  });

  describe('rendering', function() {
    before(function() {
      this.spy = sinon.spy(TodoItem.prototype, 'initialize');

      this.todo1 = new Backbone.Model({ id: 3 });
      this.todo2 = new Backbone.Model({ id: 2 });
      this.todo3 = new Backbone.Model({ id: 1 });

      this.todoList.collection = new Backbone.Collection([
        this.todo1,
        this.todo2,
        this.todo3
      ]);

      this.todoList.render();
    });

    it ('TodoItem should be instantiated thrice', function() {
      this.spy.calledThrice.should.be.ok;
    });
  });
});
