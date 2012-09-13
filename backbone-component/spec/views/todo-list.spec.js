buster.spec.expose();

describe('TodoList view', function() {
  var Backbone = require('solutionio-backbone/index.js');

  // Mocks
  var TodoItem = Backbone.View.extend()
   ,  Todos = Backbone.Collection.extend({ url: '/some url' });

  var TodoList;

  before(function() {
    var orginalRequire = window.require;

    this.stub(window, 'require', function(path) {
      if (path === 'backbone-component/src/collections/todos') {
        return Todos;
      } else if (path === 'backbone-component/src/views/todo-item') {
        return TodoItem;
      }

      return orginalRequire.apply(window, arguments);
    }.bind(this));

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
});
