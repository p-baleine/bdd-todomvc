var mockery = require('mockery');

module.exports = {

  allowables: [
      'jquery'
    , 'backbone'
    , 'htmlparser'
  ],

  registerAllowables: function() {
    var args = [].slice.call(arguments);

    args.concat(this.allowables).forEach(function(a) {
      mockery.registerAllowable(a);
    });
  },

  deregisterAllowables: function() {
    var args = [].slice.call(arguments);

    args.concat(this.allowables).forEach(function(a) {
      mockery.deregisterAllowable(a);
    });
  }
};