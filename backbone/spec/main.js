require.config({
  urlArgs: (new Date()).getTime(),
  baseUrl: './'
});

window.createContext = stubContext({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
  urlArgs: (new Date()).getTime(),
  baseUrl: './',
  paths: {
    jquery: 'libs/jquery.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min'
  }
});

require([
    'spec/models/todo.spec'
  , 'spec/collections/todos.spec'
  , 'spec/views/todolist.spec'
]);