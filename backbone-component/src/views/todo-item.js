var _ = require('underscore')
  , Backbone = require('backbone.js');

var TodoItem = module.exports = Backbone.View.extend({

  tagName: 'li',

  events: {
    'dblclick label': 'edit'
  },

  render: function() {
    this.$el.append(this.template(this.model.toJSON()));

    return this;
  },

  edit: function() {
    this.$el.addClass('editing');
  },

  template: _.template(require('../templates/todo-item.js'))

});
