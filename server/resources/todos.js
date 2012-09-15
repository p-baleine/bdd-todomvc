var Todo = require('../models/todo');

var todos = module.exports = {
  index: function(req, res) {
    Todo.find({}, function(err, todos) {
      res.send({ data: todos });
    });
  },

  create: function(req, res) {
    var todo = new Todo(req.body);

    todo.save(function(err, doc) {
      res.send(doc);
    });
  }
};