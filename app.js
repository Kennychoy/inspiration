var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var passport = require("passport");

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutusRouter = require("./routes/about-us");
var serviceRouter = require("./routes/service");
var portfolioRouter = require("./routes/portfolio");
var blogRouter = require("./routes/blog");
var contactRouter = require("./routes/contact");
var add_newsRouter = require("./routes/add_news");
var blog_singleRouter = require("./routes/blog_single");
var signUpRouter = require("./routes/sign-up");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var news_listRouter = require("./routes/news_list");
var news_editRouter = require("./routes/news_edit");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// passport config
require("./passport")(passport);
// Password Middleware
app.use(passport.initialize());
app.use(passport.session());
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/about-us", aboutusRouter);
app.use("/service", serviceRouter);
app.use("/portfolio", portfolioRouter);
app.use("/blog", blogRouter);
app.use("/contact", contactRouter);
app.use("/add_news", add_newsRouter);
app.use("/blog_single", blog_singleRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/news_list", news_listRouter);
app.use("/news_edit", news_editRouter);

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
