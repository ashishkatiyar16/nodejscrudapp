/**
 * Module dependencies.
 */
var passport = require('passport'), util = require('util'), FacebookStrategy = require('passport-facebook').Strategy, session = require('express-session'), cookieParser = require('cookie-parser'), bodyParser = require('body-parser'), config = require('./configuration/config');

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var session = require('express-session');
// load customers route
var customers = require('./routes/customers');
var app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');
var mailsender = require('./routes/mailsender');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
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

app.use(

connection(mysql, {

	host : 'localhost',
	user : 'root',
	password : 'root',
	port : 3306,
	database : 'nodejs'

}, 'pool')

);
app.get('/', routes.index);
app.post('/customers/login', customers.login_customer);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);
app.get('/customers/editprofile', customers.editprofile);
app.get('/mailsender/sendmail/:mail', mailsender.sendmail);
app.use(app.router);




passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database==='true')
      {
      connection.query("SELECT * from user_info where user_id="+profile.id,function(err,rows,fields){
        if(err) throw err;
        if(rows.length===0)
          {
            console.log("There is no such user, adding now");
            connection.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.username+"')");
          }
          else
            {
              console.log("User already exists in database");
            }
          });
      }
      return done(null, profile);
    });
  }
));






http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
