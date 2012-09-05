var jsdom = require('jsdom')
  , should = require('should')
  , sinon = require('sinon')
  , Backbone = require('backbone')
  , TodoItem = require('../../lib/views/todo-item');

var html = '<html><head></head><body></body></html>';

describe('TodoItem view', function() {
  before(function(done) {
    jsdom.env(html, ['../../vendor/jquery.js'], function(err, window) {
      document = window.document;
      Backbone.setDomLibrary(window.$);

      this.todoItem = new TodoItem();
      done(err);
    }.bind(this));
  });

  describe('instantiation', function() {
    it ('should extend Backbone.View', function() {
      this.todoItem.should.be.an.instanceOf(Backbone.View);
    });
  });
});
