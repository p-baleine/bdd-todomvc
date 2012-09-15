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
      var todoList = new TodoList();
    });

    it('should holds Todos collection', function() {
      expect(Todos.prototype.initialize).toHaveBeenCalledOnce();
    });

    it('should fetch todos', function() {
      expect(Todos.prototype.fetch).toHaveBeenCalledOnce();
    });
  });

  describe('event listening', function() {
    describe('when add event of collection is emitted', function() {
      it('should render the TodoItem', function() {
        var todoList = new TodoList()
          , newOne = new Backbone.Model({ id: 5 });

        this.spy(TodoItem.prototype, 'initialize');
        this.spy(TodoItem.prototype, 'render');

        todoList.collection.trigger('add', newOne);

        expect(TodoItem.prototype.initialize).toHaveBeenCalledOnce();
        expect(TodoItem.prototype.initialize.args[0][0].model.id).toEqual(newOne.id);
      });
    });
  });

  describe('render', function() {
    before(function() {
      this.todoList = new TodoList();

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
    describe('when enter key is pressed on input', function() {
      before(function() {
        this.todoList = new TodoList({ el: '#main' });
        this.event = Backbone.$.Event('keypress');
        this.spy(this.todoList.collection, 'add');
      });

      describe('when text value is set', function() {
        it('should add a model to its collection', function() {
          this.event.keyCode = 13;
          this.event.which = 13;
          this.todoList.createInput.val('hoge');
          this.todoList.createInput.trigger(this.event);

          expect(this.todoList.collection.add).toHaveBeenCalledOnce();
          expect(this.todoList.collection.add.args[0][0]).toEqual([{ content: 'hoge' }]);
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
});
