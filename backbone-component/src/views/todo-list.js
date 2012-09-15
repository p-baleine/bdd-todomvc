var _ = require('underscore')
  , Backbone = require('backbone.js')
  , Todos = require('../collections/todos')
  , TodoItem = require('./todo-item');

var TodoList = module.exports = Backbone.View.extend({

  events: {
    'keypress .create-todo': 'addOne'
  },

  initialize: function() {
    this.createInput = this.$('.create-todo');
    this.collection = new Todos();

    this.collection.on('add', this.renderOne, this);

    this.collection.fetch();
  },

  addOne: function(e) {
    var content = this.createInput.val();

    if ((!e.keyCode || e.keyCode != 13) || (!e.which && e.which != 13)) {
      return;
    }

    e.preventDefault();
    this.collection.add([{ content: content }]);
  },

  render: function() {
    this.collection.each(function(model) {
      this.renderOne(model);
    }, this);

    return this;
  },

  renderOne: function(todo) {
    var todoItem = new TodoItem({ model: todo });

    this.$el.append(todoItem.render().el);
  }
});