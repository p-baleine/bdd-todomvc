var Backbone = require('backbone.js')
  , Todo = require('../models/todo');

var Todos = module.exports = Backbone.Collection.extend({

  model: Todo

});