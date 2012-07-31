define([
  'jquery'
], function() {
  var noop = function() {};

  return {
    log: 'console' in window ? $.proxy(console.log, console) : noop
  };
});