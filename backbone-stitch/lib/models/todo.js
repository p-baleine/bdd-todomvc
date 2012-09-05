var $ = require('jquery')
  , Backbone = require('backbone');

/**
 * Todo Model
 *   props:
 *     title, content, priority
 */
var Todo = module.exports = Backbone.Model.extend({

  defaults: {
    'priority': 3
  },

  validate: function(attrs) {
    if (!attrs.title) {
      return 'title should be specified';
    }
  }

});