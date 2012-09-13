var Backbone = require('backbone.js')
  , Todos = require('../collections/todos')
  , TodoItem = require('./todo-item');

Backbone.$ = require('jquery'); // move this line to app top

var TodoList = module.exports = Backbone.View.extend({

  initialize: function() {
    this.collection = new Todos();
    this.collection.fetch();
  }

});