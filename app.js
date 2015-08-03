var express = require('express'), cookieParser = require('cookie-parser'), bodyParser = require('body-parser');
var routes = require('./routes'), http = require('http'), path = require('path'), session = require('express-session');
// load customers route
var customers = require('./routes/customers');
var app = express();
var mailsender = require('./routes/mailsender'), connection = require('express-myconnection');
var mysql = require('mysql'), config = require('./configuration/config');
var passport = require('passport');

var fs = require('fs');
// all environments
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(session({
	secret : 'keyboard cat',
	key : 'sid'
}));
app.use(passport.initialize());
app.use(passport.session());

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.use(session({
	resave : false, // don't save session if unmodified
	saveUninitialized : false, // don't create session until something stored
	secret : 'Ashish'
}));
app.use(connection(mysql, config.dbconfig, 'pool'));

function requireLogin(req, res, next) {
	if (req.session.loggedIn) {
		console.log("user is not logged in");
		next(); // allow the next route to run
	} else {
		console.log("else part ");
		// require the user to log in
		res.render('index', {
			page_title : "Login failure",
			title : "Failed",
			username : '',
			message : 'Please Login First'
		});

		// or render a form, etc.
	}
}
app.get('/', routes.index);
app.post('/customers/login', customers.login_customer);
app.get('/customers/logout', customers.logout_customer);
app.get('/customers', requireLogin, customers.list);
app.get('/customers/add', requireLogin, customers.add);
app.post('/customers/add', requireLogin, customers.save);
app.get('/customers/delete/:id', requireLogin, customers.delete_customer);
app.get('/customers/edit/:id', requireLogin, customers.edit);
app.post('/customers/edit/:id', requireLogin, customers.save_edit);
app.get('/mailsender/sendmail/:mail', requireLogin, mailsender.sendmail);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
