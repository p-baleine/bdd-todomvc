buster.spec.expose();

describe('Todos collection', function() {
  var Backbone = require('solutionio-backbone/index.js');

  // Mocks
  var Todo = Backbone.Model.extend();

  var Todos;

  before(function() {
    specHelper.stubRequire.bind(this)({
      'backbone-component/src/models/todo': Todo
    });

    Todos = require('backbone-component/src/collections/todos');
  });

  it('should be a constructor', function() {
    expect(Todos).toBeFunction();
  });

  it('should have Todo as its model property', function() {
    var todos = new Todos();

    expect(todos.model).toBe(Todo);
  });

  describe('add array of object literals', function() {
    it('should create Todo model instance', function() {
      var todos = new Todos();

      this.spy(Todo.prototype, 'initialize');
      todos.add([{ id: 1 }, { id: 2 }, { id: 3 }]);

      expect(Todo.prototype.initialize).toHaveBeenCalledThrice();
    });
  });

  describe('parse server response', function() {
    it('should retrieve todos from response', function() {
      var todos = new Todos();

      expect(todos.parse({ data: 'hoge' })).toEqual('hoge');
    });
  });
});