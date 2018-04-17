var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {findOrCreateUser} = require('./utils/user.js');

var studentRouter = require('./routes/student');
var publicRouter = require('./routes/public');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Database connection
const {mysqlConnection} = require('./utils/database-mysql.js')

app.use(function(req, res, next){
	res.locals.connection = mysqlConnection;
	next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// auth0 setup
const jwtCheck = require('./utils/jwtCheck.js');
// for authentification debug use
/*app.use(function(req, res, next){
	console.log(req.headers.authorization);
	next();
})*/

app.use('/student', jwtCheck, findOrCreateUser, studentRouter);
app.use('/public', publicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
