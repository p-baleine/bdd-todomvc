var mongoose = require('mongoose')
  , should = require('should');

var Todo = require('../models/todo');

describe('Todo model', function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/bdd-todomvc-backbone-component_test', function() {
      Todo.remove(done);
    });
  });

  it('should create a new Todo', function(done) {
    var todo = new Todo({ content: 'hohoho' });

    todo.save(function() {
      Todo.findOne({ _id: todo._id }, function(err, retrievedTodo) {
        retrievedTodo.content.should.equal('hohoho');
        done();
      });
    });
  });

  it('should not create a new Todo without content', function(done) {
    var todo = new Todo();

    todo.save(function(err) {
      err.message.should.equal('Validation failed');
      done();
    });
  });
});