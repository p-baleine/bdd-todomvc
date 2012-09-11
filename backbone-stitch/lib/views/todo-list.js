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
    this.collection.on('add', this.renderOne, this);
  },

  render: function() {
    this.collection.each(this.renderOne, this);
  },

  renderOne: function(model) {
    var view = new TodoItem(model);
    this.$el.append(view.render().el);
  },

  addOne: function(e) {
    if (!(e.which && e.which === 13) && !(e.keyCode && e.keyCode === 13)) {
      return;
    }

    this.collection.add([{ content: $(e.target).val() }]);
  }

});