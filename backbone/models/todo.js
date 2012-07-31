define([
    'util'
  , 'backbone'
], function(util) {

  var TodoModel = Backbone.Model.extend({

    defaults: {
      'priority': 3
    },

    validate: function(attr) {
      if ( !attr.title ) {
        return 'cannot have an empty title';
      }
    }

  });

  return TodoModel;
});