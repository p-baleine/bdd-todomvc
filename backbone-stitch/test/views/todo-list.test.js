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

// html
var html = fs.readFileSync('./test/views/test-view.html').toString();

describe('TodoList view', function() {
  before(function(done) {
    // mocks
    this.TodoItem = Backbone.View.extend();
    this.Todo = Backbone.Model.extend();
    this.Todos = Backbone.Collection.extend({ model: this.Todo, url: '/hoge' });

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

  describe('initialize', function() {
    beforeEach(function() {
      sinon.stub(Backbone, 'sync'); // return
      sinon.spy(this.Todos.prototype, 'fetch');
      this.todoList = new this.TodoList({ el: '#main' });
    });

    afterEach(function() {
      Backbone.sync.restore();
      this.Todos.prototype.fetch.restore();
      this.todoList.collection.reset();
    });

    it ('should fetch Todos', function() {
      this.Todos.prototype.fetch.calledOnce.should.be.ok;
    });

    describe('event listening', function() {
      describe('when add event is fired on Todos collection', function() {
        beforeEach(function() {
          sinon.spy(this.TodoItem.prototype, 'render');

          this.added = new Backbone.Model({ content: 'piyo' });
          this.todoList.collection.add(this.added);
        });

        afterEach(function() {
          this.TodoItem.prototype.render.restore();
        });

        it ('should render TodoItem view with passed model', function() {
          this.TodoItem.prototype.render.calledOnce.should.be.ok;
        });
      });

      describe('when reset event is fired on Todos collection', function() {
        it ('should re-render entire TodoItem views');
      });
    });
  });

  describe('rendering', function() {
    beforeEach(function() {
      sinon.spy(this.TodoItem.prototype, 'initialize');
      sinon.spy(this.TodoItem.prototype, 'render');
      sinon.spy(this.todoList.$el, 'append');

      this.todoList.collection.add([{ id: 3 }, { id: 2 }, { id: 1 }], { silent: true });
      this.todoList.render();
    });

    afterEach(function() {
      this.TodoItem.prototype.initialize.restore();
      this.TodoItem.prototype.render.restore();
      this.todoList.$el.append.restore();
      this.todoList.collection.reset();
    });

    it ('should create TodoItem', function() {
      this.TodoItem.prototype.initialize.calledThrice.should.be.ok;
      this.TodoItem.prototype.initialize.args[0][0].id.should.equal(3);
      this.TodoItem.prototype.initialize.args[1][0].id.should.equal(2);
      this.TodoItem.prototype.initialize.args[2][0].id.should.equal(1);
    });

    it ('should render TodoItem', function() {
      this.TodoItem.prototype.render.calledThrice.should.be.ok;
    });

    it ('should append rendered TodoItem\'s el to its el', function() {
      this.todoList.$el.append.calledThrice.should.be.ok;
    });
  });

  describe('create new todo', function() {
    describe('when enter-key event is pressed', function() {
      describe('when text value is set', function() {
        beforeEach(function() {
          var input = this.$(document).find('#new-todo')
            , event = this.$.Event('keypress');

          sinon.spy(this.todoList.collection, 'add');

          this.expected = { content: 'hoge123' };

          event.keyCode = 13;
          input.val(this.expected.content);
          input.trigger(event);
        });

        afterEach(function() {
          this.todoList.collection.add.restore();
          this.todoList.collection.reset();
        });

        it ('should call add on Todos collection', function() {
          this.todoList.collection.add.calledOnce.should.be.ok;
          this.todoList.collection.add.args[0][0].should.eql([this.expected]);
        });
      });
    });
  });
});
