const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const session = require("express-session")

const apiRouter = require('./routes/api');


const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/myBlog", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//add session
app.use(session({
    key: 'userId',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60
    }
}));

//check session for request
app.use((req, res, next) => {
    if (!req.session.user && req.cookies.userId) {
        res.clearCookie('userId');
    }
    next();
})

// router and api
app.use('/', apiRouter);

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