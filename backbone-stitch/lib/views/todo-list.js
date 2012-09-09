/**
 * Module dependencies
 */

var $ = require('jquery')
  , Backbone = require('backbone')
  , Todo = require('../models/todo')
  , Todos = require('../collections/todos')
  , TodoItem = require('./todo-item');

var TodoList = module.exports = Backbone.View.extend({

  events: {
    'keypress #new-todo': 'addOne'
  },

  initialize: function() {
    this.collection = new Todos();
  },

  render: function() {
    this.collection.each(function(model) {
      new TodoItem(model);
    });
  },

  addOne: function(e) {
    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
      this.collection.add([{ content: $(e.target).val() }]);
    }
  }

});