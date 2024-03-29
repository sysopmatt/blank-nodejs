
/**
 * Module dependencies.
 */

var express = require('express'), 
  routes = require('./routes'), 
  http = require('http'),
  path = require('path');

var bodyParser     =        require("body-parser");
var cmd 	=        require("node-cmd");

var helmet = require('helmet');
var engine = require('ejs-locals');

var app = express();

app.use(helmet());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/admin', routes.admin);


app.post('/', function (req, res) {

	var email = req.body.email;
	var password = req.body.password;
	var method = req.body.method;
	var scheme = req.body.scheme;
	var options = req.body.options;
	var reset_commas = req.body.reset_commas;
	tools.nickname(method, email, password, reset_commas, scheme).then(function(data) {

		var output = data;

		res.end(JSON.stringify(output));
	});

});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

