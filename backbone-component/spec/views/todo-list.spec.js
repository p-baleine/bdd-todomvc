buster.spec.expose();

describe('TodoList view', function() {
  var Backbone = require('solutionio-backbone/index.js');

  // Mocks
  var TodoItem = Backbone.View.extend()
   ,  Todos = Backbone.Collection.extend({ url: '/some url' });

  var TodoList;

  before(function() {
    specHelper.stubRequire.bind(this)({
      'backbone-component/src/collections/todos': Todos,
      'backbone-component/src/views/todo-item': TodoItem
    });
    specHelper.setupViewSpec();

    TodoList = require('backbone-component/src/views/todo-list');
  });

  it('should be an constructor', function() {
    expect(TodoList).toBeFunction();
  });

  describe('initialization', function() {
    before(function() {
      this.spy(Todos.prototype, 'initialize');
      this.spy(Todos.prototype, 'fetch');
      this.todoList = new TodoList({ input: { on: this.spy() } });
    });

    it('should holds Todos collection', function() {
      expect(Todos.prototype.initialize).toHaveBeenCalledOnce();
    });

    it('should fetch todos', function() {
      expect(Todos.prototype.fetch).toHaveBeenCalledOnce();
    });
  });

  describe('event listening', function() {
    before(function() {
      this.todoList = new TodoList({ input: { on: this.spy() } });
      this.spy(TodoItem.prototype, 'initialize');
      this.spy(TodoItem.prototype, 'render');
    });

    describe('when add event of collection is emitted', function() {
      it('should render the TodoItem', function() {
        var newOne = new Backbone.Model({ id: 4 });

        this.todoList.collection.trigger('add', newOne);

        expect(TodoItem.prototype.initialize).toHaveBeenCalledOnce();
        expect(TodoItem.prototype.initialize.args[0][0].model.id).toEqual(newOne.id);
      });
    });

    describe('when reset event of collection is emitted', function() {
      it('should render all TodoItems', function() {
        var newOnes = [{ id: 5 }, { id: 6 }];

        this.todoList.collection.reset(newOnes);

        expect(TodoItem.prototype.initialize).toHaveBeenCalledTwice();
        expect(TodoItem.prototype.initialize.args[0][0].model.id).toEqual(5);
        expect(TodoItem.prototype.initialize.args[1][0].model.id).toEqual(6);
      });
    });
  });

  describe('render', function() {
    before(function() {
      this.todoList = new TodoList({ input: { on: this.spy() } });

      this.spy(TodoItem.prototype, 'initialize');
      this.spy(TodoItem.prototype, 'render');
      this.spy(this.todoList.$el, 'append');

      // make add event not fired by {slient: true}
      this.todoList.collection.add([{ id: 1 }, { id: 2 }, { id: 3 }], { silent: true });
      this.todoList.render();
    });

    it('should render TodoItems for each Todo models', function() {
      expect(TodoItem.prototype.initialize).toHaveBeenCalledThrice();
      expect(TodoItem.prototype.render).toHaveBeenCalledThrice();
    });

    it('should add rendered TodoItem\'s  els to its el', function() {
      expect(this.todoList.$el.append).toHaveBeenCalledThrice();
    });
  });

  describe('create new one', function() {
    before(function() {
      this.todoList = new TodoList({ el: '#todo-list', input: Backbone.$('#create-todo') });
      this.event = Backbone.$.Event('keypress');
      this.spy(this.todoList.collection, 'create');
      this.spy(this.todoList.collection, 'add');
    });

    describe('when enter key is pressed on input', function() {
      describe('when text value is set', function() {
        it('should add a model to its collection', function() {
          this.event.keyCode = 13;
          this.event.which = 13;
          this.todoList.createInput.val('hoge');
          this.todoList.createInput.trigger(this.event);

          expect(this.todoList.collection.create).toHaveBeenCalledOnce();
          expect(this.todoList.collection.create.args[0][0]).toEqual({ content: 'hoge' });
        });
      });

      describe('when text value is not set', function() {
        it('should do nothing', function() {
          this.event.keyCode = 13;
          this.event.which = 13;
          this.todoList.createInput.val('');
          this.todoList.createInput.trigger(this.event);

          expect(this.todoList.collection.add).not.toHaveBeenCalled();
        });
      });
    });

    describe('when pushed except enter key on input', function() {
      it('should do nothing', function() {
        this.event.keyCode = 11;
        this.event.which = 11;
        this.todoList.createInput.val('hoge');
        this.todoList.createInput.trigger(this.event);

        expect(this.todoList.collection.add).not.toHaveBeenCalled();
      });
    });
  });
});
