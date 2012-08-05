define([
    'models/todo'
  , 'backbone'
], function(Todo) {

  var Todos = Backbone.Collection.extend({

    model: Todo,

    comparator: function(todo) {
      return todo.get('priority');
    }

  });

  return Todos;
});