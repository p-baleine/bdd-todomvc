define([
    'models/todo'
  , 'myutil'
  , 'backbone'
], function(TodoModel, util) {

  var TodosCollection = Backbone.Collection.extend({

    model: TodoModel,

    url: '/todos',

    comparator: function(todo) {
      return todo.get('priority');
    },

    parse: function(res) {
      return res.response.todos;
    }
  });

  return TodosCollection;
});