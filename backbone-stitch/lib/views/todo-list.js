/**
 * Module dependencies
 */

var Backbone = require('backbone')
  , TodoItem = require('./todo-item');

var TodoList = module.exports = Backbone.View.extend({

  render: function() {
    this.collection.each(function(model) {
      new TodoItem(model);
    });
  }

});