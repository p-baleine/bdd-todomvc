require.config({
    shim: {
      'underscore': {
        exports: '_'
    }
    , 'backbone': {
        deps: ['underscore', 'jquery']
      , exports: 'Backbone'
    }
    , 'sinon': {
        exports: 'sinon'
    }
    , 'testr': {
        exports: 'testr'
    }
  }

  , baseUrl: '../'

  , urlArgs: (new Date()).getTime()

  , paths: {
      jquery: 'libs/jquery.min'
    , underscore: 'libs/underscore-min'
    , backbone: 'libs/backbone-min'
    , text: 'libs/text'
    , sinon: 'libs/sinon'
    , jasmine_sinon: 'libs/jasmine-sinon'
    , jasmine_jquery: 'libs/jasmine-jquery'
    , testr: 'libs/testr'
  }
});

define([
    'myutil'
  , 'spec/models/todo.spec'
  , 'spec/collections/todos.spec'
  , 'spec/views/todolist.spec'
], function(util) {
  util.log('loaded');
});