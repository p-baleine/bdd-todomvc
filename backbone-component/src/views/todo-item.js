var _ = require('underscore')
  , Backbone = require('backbone.js');

var TodoItem = module.exports = Backbone.View.extend({

  render: function() {
    this.setElement(this.template(this.model.toJSON()));

    return this;
  },

  template: _.template(require('../templates/todo-item.js'))

});
