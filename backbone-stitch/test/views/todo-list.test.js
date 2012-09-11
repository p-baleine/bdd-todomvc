/**
 * Module dependencies
 */
var fs = require('fs')
  , jsdom = require('jsdom')
  , should = require('should')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , Backbone = require('backbone')
  , helper = require('../helper');

/**
 * html
 */
var html = fs.readFileSync('./test/views/test-view.html').toString();

describe('TodoList view', function() {
  before(function(done) {
    // mocks
    this.TodoItem = Backbone.View.extend();
    this.Todo = Backbone.Model.extend();
    this.Todos = Backbone.Collection.extend({ model: this.Todo });

    mockery.registerMock('./todo-item', this.TodoItem);
    mockery.registerMock('../collections/todos', this.Todos);

    helper.registerAllowables('../../lib/views/todo-list', '../models/todo');
    mockery.enable();

    // target
    this.TodoList = require('../../lib/views/todo-list');

    jsdom.env(html, ['../../vendor/jquery.js'], function(err, window) {
      document = window.document;
      Backbone.setDomLibrary(window.$);
      this.$ = window.$;

      this.todoList = new this.TodoList({ el: '#main' });

      done(err);
    }.bind(this));
  });

  after(function() {
    mockery.deregisterMock('./todo-item');
    mockery.deregisterMock('../collections/todos');
    helper.deregisterAllowables();
    mockery.disable();
  });

  it ('should extend Backbone.View', function() {
    this.todoList.should.be.an.instanceOf(Backbone.View);
  });

  describe('rendering', function() {
    describe('collection', function() {
      before(function() {
        sinon.spy(this.todoList, 'renderOne');
        this.todoList.collection.add([{ id: 3 }, { id: 2 }, { id: 1 }]);
        this.todoList.render();
      });

      after(function() {
        this.todoList.collection.reset();
        this.todoList.renderOne.restore();
      });

      it ('should render todo items thrice', function() {
        this.todoList.renderOne.calledThrice.should.be.ok;
        this.todoList.renderOne.args[0][0].attributes.should.eql({ id: 3 });
      });
    });

    describe('one item', function() {
      beforeEach(function() {
        sinon.spy(this.TodoItem.prototype, 'initialize');
        sinon.spy(this.TodoItem.prototype, 'render');
        sinon.spy(this.todoList.$el, 'append');
        this.todo = new Backbone.Model({ id: 1 });
        this.todoList.renderOne(this.todo);
      });

      afterEach(function() {
        this.TodoItem.prototype.initialize.restore();
        this.TodoItem.prototype.render.restore();
        this.todoList.$el.append.restore();
      });

      it ('should instantiate TodoItem', function() {
        this.TodoItem.prototype.initialize.calledOnce.should.be.ok;
        this.TodoItem.prototype.initialize.args[0][0].id.should.equal(1);
      });

      it ('should render TodoItem', function() {
        this.TodoItem.prototype.render.calledOnce.should.be.ok;
      });

      it ('should append rendered TodoItem\'s el to its el', function() {
        this.todoList.$el.append.calledOnce.should.be.ok;
      });
    });
  });

  describe('create new todo', function() {
    describe('when enter-key event is pressed', function() {
      describe('when text value is set', function() {
        before(function() {
          var input = this.$(document).find('#new-todo')
            , event = this.$.Event('keypress');

          sinon.spy(this.Todos.prototype, 'add');

          this.expected = { content: 'hoge' };

          event.keyCode = 13;
          input.val(this.expected.content);
          input.trigger(event);
        });

        after(function() {
          this.Todos.prototype.add.restore();
          this.todoList.collection.reset();
        });

        it ('should call add on Todos collection', function() {
          this.Todos.prototype.add.calledOnce.should.be.ok;
          this.Todos.prototype.add.args[0][0].should.eql([this.expected]);
        });
      });
    });

    describe('when add event is fired on Todos collection', function() {
      before(function() {
        var init = this.TodoList.prototype.initialize;

        // spying event related method
        this.TodoList.prototype.initialize = function() {
          sinon.spy(this, 'renderOne');
          init.apply(this, arguments);
        };

        this.todoList = new this.TodoList({ el: '#main' });

        this.added = new Backbone.Model({ content: 'piyo' });
        this.todoList.collection.add(this.added);
      });

      after(function() {
        this.todoList.renderOne.restore();
      });

      it ('should render new TodoItem view', function() {
        this.todoList.renderOne.calledOnce.should.be.ok;
        this.todoList.renderOne.args[0][0].get('content').should.eql('piyo');
      });
    });
  });
});
