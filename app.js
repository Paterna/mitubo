var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var busboy = require('connect-busboy');
var session = require('express-session');
var MongoStore = require('connect-mongostore')(session);
var mongoose = require('mongoose');

var routes = require('./routes/index');
var models = require('./models');
var ctrl = require('./controllers/index');
var userCtrl = require('./controllers/users');

var app = express();

// mongoose.connect('mongodb://localhost/mitubo');
var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());
app.use(expressLayouts);
app.use(session({
        secret: 'vn23092n6nc13n517',
        store: new MongoStore({ db: mongoose.connections[0].db }),
        resave: false,
        saveUninitialized: true
    }));
app.use(express.static(path.join(__dirname, '/')));

app.use(function(req, res, next) {

   // Hacer visible req.session en las vistas
   res.locals.session = req.session;
   res.locals.url = req.url;
   next();
});

app.use('/', routes);

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
        error: {}
    });
});

module.exports = app;
