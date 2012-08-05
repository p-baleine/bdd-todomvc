// https://coderwall.com/p/teiyew

function stubContext(config) {
  return function(stubs) {
    var map = {},
        context;

    _.each(stubs, function(val, key) {
      var stubName = 'stub_' + key;

      map[key] = stubName;
    });

    context = require.config(
      _.extend({
        context: Math.floor(Math.random() * 1000000),
        map: {
          "*": map
        }
      }, config)
    );

    _.each(stubs, function(val, key) {
      var stubName = 'stub_' + key;

      define(stubName, function() {
        return val;
      });
    });

    return context;
  };
}
