var Backbone = require('backbone')
  , Todo = require('../models/todo');

var Todos = module.exports = Backbone.Collection.extend({
  model: Todo
});