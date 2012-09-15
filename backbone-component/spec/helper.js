(function(global) {

  function stubRequire(map) {
    var originalRequire = window.require;

    this.stub(window, 'require', function(path) {
      var p;

      for (p in map) {
        if (p === path) {
          return map[path];
        }
      }

      return originalRequire.apply(window, arguments);
    });
  }

  function setupViewSpec() {
    var $ = require('component-jquery')
      , Backbone = require('solutionio-backbone');

    Backbone.$ = $;
  }

  this['specHelper'] = {
    stubRequire: stubRequire,
    setupViewSpec: setupViewSpec
  };

}(this));