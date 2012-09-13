buster.spec.expose();

describe('Todos collection', function() {
  var Backbone = require('solutionio-backbone/index.js');

  // Mocks
  var Todo = Backbone.Model.extend();

  var Todos;

  before(function() {
    var orginalRequire = window.require;

    this.stub(window, 'require', function(path) {
      if (path === 'backbone-component/src/models/todo') {
        return Todo;
      }

      return orginalRequire.apply(window, arguments);
    }.bind(this));

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
    before(function() {
      this.spy(Todo.prototype, 'initialize');
    });

    it('should create Todo model instance', function() {
      var todos = new Todos();

      todos.add([{ id: 1 }, { id: 2 }, { id: 3 }]);
      expect(Todo.prototype.initialize).toHaveBeenCalledThrice();
    });
  });
});