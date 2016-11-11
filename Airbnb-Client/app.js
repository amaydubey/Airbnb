
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

/**
 * passport dependencies
 */
passport = require('passport');
   
/**
 * Session dependencies
 */
session = require('express-session')

   
/**
 * Utilities dependencies should be added after this
 */
mongo = require("./routes/utils/util.mongo");

   
/**
 * All route dependencies
 */

   
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var mongoStore = require("connect-mongo")(session);

var app = express();

//session properties
app.use(session({
	secret: 'eBay_client_session',
	resave : false,
	saveUninitialized : false,
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({  
		url: mongoSessionConnectURL})
	})
);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


mongo.connect(mongoSessionConnectURL, function(){  
	console.log('Connected to mongo at: ' + mongoSessionConnectURL); 
	http.createServer(app).listen(app.get('port'), function(){  
		console.log('Express server listening on port ' + app.get('port'));  
	});  
});

