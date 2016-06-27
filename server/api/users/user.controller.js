"use strict";
var user_model_1 = require('./user.model');
var car_model_1 = require("../cars/car.model");
function fetchCars(req, res, next) {
    car_model_1.Car
        .find({ owner: req.params.id })
        .exec(function (err, cars) {
        if (err)
            return next(err);
        res.json(cars);
    });
}
exports.fetchCars = fetchCars;
function createCar(req, res, next) {
    car_model_1.Car.create(req.body, function (err, car) {
        if (err)
            return next(err);
        car.owner = req.params.id;
        car.save(function (err, result) {
            if (err)
                return next(err);
            res.json({ success: true, car: result });
        });
    });
}
exports.createCar = createCar;

function login(req, res, next) {
    user_model_1.User
        .findOne({ username: req.body.username })
        .exec(function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return next({ status: 401, message: 'No such user.' });
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err)
                return next(err);
            if (!isMatch)
                return next({ status: 401, message: 'Invalid email/password combination.' });
            res.json({ token: user.createJWT(), user: user });
        });
    });
}
exports.login = login;
function register(req, res, next) {
    user_model_1.User.create(req.body, function (err, user) {
        if (err)
            return next(err);
        user.hashPassword(req.body.password, function (err) {
            if (err)
                return next(err);
            user.save(function (err, data) {
                if (err)
                    return next(err);
                res.json({ token: data.createJWT() });
            });
        });
    });
}
exports.register = register;
