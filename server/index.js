var express = require('express')
  , mongoose = require('mongoose')
  , resource = require('./lib/resource')
  , todos = require('./resources/todos');

var app = express();

/**
 * settings
 */

app.configure('development', function() {
  app.set('mongodb connstr', 'mongodb://localhost/bdd-todomvc-backbone-component');
});

app.configure('production', function() {
  app.set('mongodb connstr', 'mongodb://localhost/bdd-todomvc-backbone-component');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/*
 * middleware
 */

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

mongoose.connect(app.set('mongodb connstr'));
resource = resource(app);

resource('/todos', todos);

app.get('/', function(req, res) {
  res.render('index.jade');
});

app.listen(3000);
console.log('Listening on port 3000');