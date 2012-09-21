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

  describe('initialize', function() {
    it('should holds LI as its el', function() {
      var todoItem = new TodoItem();
      expect(todoItem.tagName).toEqual('li');
    });
  });

  describe('render', function() {
    it('should append todo item html to its el', function() {
      var todo = new Todo({ content: 'hoge' })
        , todoItem = new TodoItem({ model: todo });

      this.spy(todoItem.$el, 'append');

      todoItem.render();

      expect(todoItem.$el.append).toHaveBeenCalledOnce();
    });
  });

  describe('edit', function() {
    it('should be editable when dblclick the todo text', function() {
      var todo = new Todo({ content: 'hoge' })
        , todoItem = new TodoItem({ model: todo })
        , event = Backbone.$.Event('dblclick');

      todoItem.render();
      todoItem.$('label').trigger(event);

      expect(todoItem.el).toHaveClassName('editing');
    });
  });
});