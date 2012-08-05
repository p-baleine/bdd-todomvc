define([
  'backbone'
], function() {

  var Todo = Backbone.Model.extend({

    defaults: {
      'priority': 3
    },

    validate: function(attrs) {
      if ( !attrs.title ) {
        return 'タイトルを入力してください';
      }
    }

  });

  return Todo;
});