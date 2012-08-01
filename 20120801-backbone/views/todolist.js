define([
    'myutil'
  , 'views/todo'
  , 'backbone'
], function(util, TodoView) {

  var TodoListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'todos',

    render: function() {
      this.collection.each(this.addOne);
    },

    addOne: function(todo) {
      var view = new TodoView({ model: todo });
    }
  });

  return TodoListView;

});