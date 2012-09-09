var jsdom = require('jsdom')
  , should = require('should')
  , sinon = require('sinon')
  , Backbone = require('backbone')
  , TodoList = require('../../lib/views/todo-list')
  , TodoItem = require('../../lib/views/todo-item');

var html = '<html><head></head><body><div id="main"><input id="new-todo" type="text" /></div></body></html>';

var $;

describe('TodoList view', function() {
  before(function(done) {
    jsdom.env(html, ['../../vendor/jquery.js'], function(err, window) {
      var self = this;

      document = window.document;
      Backbone.setDomLibrary($ = window.$);

      this.todoList = new TodoList({ el: '#main' });
      this.Model = Backbone.Model.extend();
      this.Collection = Backbone.Collection.extend({ model: this.Model });

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
      this.collection = new this.Collection();
      this.todoList.collection = this.collection;

      this.spy = sinon.spy(TodoItem.prototype, 'initialize');

      this.todo1 = new this.Model({ id: 3 });
      this.todo2 = new this.Model({ id: 2 });
      this.todo3 = new this.Model({ id: 1 });

      this.todoList.collection.add([
        this.todo1,
        this.todo2,
        this.todo3
      ]);

      this.todoList.render();
    });

    after(function() {
      TodoItem.prototype.initialize.restore();
    });

    it ('TodoItem should be instantiated thrice', function() {
      this.spy.calledThrice.should.be.ok;
      this.spy.args[0].should.include(this.todo1);
    });
  });

  describe('create new todo', function() {
    describe('when enter-key event is pressed', function() {
      describe('when text value is set', function() {
        before(function() {
          var self = this
            , input = $(document).find('#new-todo')
            , event = $.Event('keypress');

          this.collection = new this.Collection();
          this.todoList.collection = this.collection;

          this.modelSpy = sinon.spy(this.Model.prototype, 'initialize');
          this.collSpy = sinon.spy(this.collection, 'add');

          event.keyCode = 13;
          input.val('hoge');
          input.trigger(event);
        });

        after(function() {
          this.Model.prototype.initialize.restore();
          this.collection.add.restore();
        });

        it ('should create new todo', function() {
          this.modelSpy.calledOnce.should.be.ok;
          should.exist(this.modelSpy.args[0]);
          this.modelSpy.args[0][0].should.include({ content: 'hoge' });
        });

        it ('should add new todo to collection', function() {
          this.collSpy.calledOnce.should.be.ok;
        });
      });
    });
  });
});
