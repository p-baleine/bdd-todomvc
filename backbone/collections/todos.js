define([
    'models/todo'
  , 'backbone'
], function(Todo) {

  var Todos = Backbone.Collection.extend({

    model: Todo,

    comparator: function(todo) {
      console.log(todo.get('priority'));
      return todo.get('priority');
    }

  });

  return Todos;
});