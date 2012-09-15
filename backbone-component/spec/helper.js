(function() {

  var global = this;

  function stubRequire(map) {
    var originalRequire = global.require;

    this.stub(global, 'require', function(path) {
      var p;

      for (p in map) {
        if (p === path) {
          return map[path];
        }
      }

      return originalRequire.apply(global, arguments);
    });
  }

  function setupViewSpec() {
    var $ = require('component-jquery')
      , Backbone = require('solutionio-backbone');

    Backbone.$ = $;
  }

  global['specHelper'] = {
    stubRequire: stubRequire,
    setupViewSpec: setupViewSpec
  };

}.call(this));