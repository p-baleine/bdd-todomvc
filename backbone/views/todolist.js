define([
    'views/todo'
  , 'backbone'
], function(TodoItem) {

  var TodoList = Backbone.View.extend({

    render: function() {
      this.collection.each(this.addOne);
    },

    addOne: function(todo) {
      var item = new TodoItem({ model: todo });
    }

  });

  return TodoList;

});