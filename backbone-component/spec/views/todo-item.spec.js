buster.spec.expose();

describe('TodoItem view', function() {
  var Backbone = require('solutionio-backbone/index.js');

  // Mocks
  var Todo = Backbone.Model.extend();

  var TodoItem;

  before(function() {
    specHelper.stubRequire.bind(this)({
      'backbone-component/src/models/todo': Todo
    });
    specHelper.setupViewSpec();

    TodoItem = require('backbone-component/src/views/todo-item');
  });

  it('should be a constructor', function() {
    expect(TodoItem).toBeFunction();
  });

  describe('render', function() {
    it('should render TodoItem with \'todo-item\' class', function() {
      var todo = new Todo({ content: 'hoge' })
        , todoItem = new TodoItem({ model: todo });

      todoItem.render();

      expect(todoItem.el).toHaveClassName('todo-item');
    });
  });
});