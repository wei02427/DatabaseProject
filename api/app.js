var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var testAPIRouter = require('./routes/testAPI.js');
var register=require('./routes/register')
var login=require('./routes/login')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require("cors");
var app = express();

const expressJwt = require('express-jwt')

const config = require('../config/development_config');
const mysql = require('mysql')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Add cors
app.use(cors());
app.use(express.json())
app.use(expressJwt({
  secret: 'secret12345'  // 签名的密钥 或 PublicKey
}).unless({
  path: ['/login', '/register','/testAPI']  // 指定路径不经过 Token 解析
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/register", register);
app.use("/login", login);
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
