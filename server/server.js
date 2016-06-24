"use strict";
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');
var app = express();
var PORT = process.env.PORT || 3000;
var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/dream-car';
require('./api/cars/car.model');
require('./api/users/user.model');
mongoose.connect(MONGO_URL, function (err) {
    if (err)
        console.error(err);
    else
        console.log("Connected to " + MONGO_URL);
});
app.get(/\/client.{0,}\/.+\.jade/, function (req, res, next) {
    res.render(config.root + req.path);
});
app.use(require('body-parser')());
app.use('/client', express.static('client'));
app.use('/bower_components', express.static('bower_components'));
app.get('/', function (req, res, next) {
    res.sendFile(config.client + '/index.html');
});
app.use('/api/v1/cars', require('./api/cars/car.routes'));
app.use('/api/v1/users', require('./api/users/user.routes'));
app.get(/\/(client|bower_components|api).{0,}/, function (req, res, next) {
    next({ status: 404, message: req.path + " is not found, or does not exist. Please check for typos." });
});
app.get('/*', function (req, res, next) {
    res.sendFile(config.client + '/index.html');
});
app.use(function (req, res, next) {
    return next({ status: 404, message: req.method + ": " + req.path + " is not found." });
});
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production')
        console.log(err);
    if (process.env.NODE_ENV === 'production')
        err = { status: err.status || 500, message: err.message || '' };
    res.status(err.status).send(err);
});
app.listen(PORT, function () {
    console.log("Server is listening on localhost:" + PORT);
});
