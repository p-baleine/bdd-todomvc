var _ = require('underscore')
  , Backbone = require('backbone.js')
  , Todo = require('../models/todo')
  , Todos = require('../collections/todos')
  , TodoItem = require('./todo-item');

var TodoList = module.exports = Backbone.View.extend({

  initialize: function() {
    this.createInput = this.options.input;
    this.createInput.on('keypress', _.bind(this.addOne, this));
    this.collection = new Todos();

    this.collection.on('add', this.renderOne, this);
    this.collection.on('reset', this.render, this);

    this.collection.fetch();
  },

  addOne: function(e) {
    var content = this.createInput.val();

    if ((!e.keyCode || e.keyCode != 13) || (!e.which && e.which != 13)) return;
    if (content === '') return;

    e.preventDefault();

    this.collection.create({ content: content });
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