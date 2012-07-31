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
    'util'
], function(util) {
  util.log('loaded');
});