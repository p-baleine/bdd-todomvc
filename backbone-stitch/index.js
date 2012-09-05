var stitch  = require('stitch');
var fs      = require('fs');

var pack = stitch.createPackage({
  paths: [__dirname + '/lib', __dirname + '/vendor']
});

pack.compile(function (err, source){
  fs.writeFile('package.js', source, function (err) {
    if (err) throw err;
    console.log('Compiled package.js');
  });
});