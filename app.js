var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var index = require('./routes/index');
var users = require('./routes/users');
var food = require('./routes/food');
var orders = require('./routes/orders');
var orderItems = require('./routes/orderItems');
var pay = require('./routes/pay');
var graphs = require('./routes/graphs');
var app = require('express')();
var ig = require('instagram-node').instagram();
var Twitter = require('twitter');
var socialmedia = require('./routes/socialmedia');
var approvedSocialMedia = require('./routes/approvedSocialMedia');

// For login
var passport = require('passport');
var flash    = require('connect-flash');
var morgan   = require('morgan');
var session  = require('express-session');

require('./config/passport')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//TODO: We're using ejs due to login pages: app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//TODO: app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// For login:
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', index);
app.use('/users', users);
app.use('/foods', food);
app.use('/orders', orders);
app.use('/orderItems', orderItems);
app.use('/pay', pay);
app.use('/approvedSocialMedia', approvedSocialMedia);
app.use('/graphs', graphs);
app.use('/socialmedia', socialmedia)

// load the login-related routes and pass in our app and fully configured passport
require('./routes/loginRoutes.js')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err //TODO: {}
  });
});


module.exports = app;
