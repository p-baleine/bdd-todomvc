var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Todo = new Schema({
  content: { type: String, required: true }
});

module.exports = mongoose.model('Todo', Todo);