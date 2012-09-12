// TODO RequireJS optimizer

define('src/collections/todos', [
    'src/models/todo'
  , 'backbone'
], function(Todo) {

  var Todos = Backbone.Collection.extend({

    model: Todo

  });

  return Todos;

});
