"use strict";
var car_model_1 = require('./car.model');
var user_model_1 = require('../users/user.model');
function getAll(req, res, next) {
    var query = { adoptable: true };
    if (req.query.type) {
        if (req.query.type.match(/dog/i))
            query['type'] = "Dog";
        else if (req.query.type.match(/cat/i))
            query['type'] = "Cat";
        else if (req.query.type.match(/other/i))
            query['type'] = "Other";
    }
    car_model_1.Car
        .find(query)
        .select('-color -location.streetAddress -location.streetAddress2')
        .exec(function (err, result) {
        if (err)
            return next(err);
        res.json(result);
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    car_model_1.Car
        .findOne({ _id: req.params.id })
        .exec(function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ status: 404, message: 'Could not find car in the database.' });
        res.json(result);
    });
}
exports.getOne = getOne;
function create(req, res, next) {
    var p = new car_model_1.Car(req.body);
    p.save(function (err, result) {
        if (err)
            return next(err);
        res.json(result);
    });
}
exports.create = create;
function update(req, res, next) {
    console.log(req.body);
    car_model_1.Car.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ status: 404, message: "Could not find the requested car." });
        res.send(result);
    });
}
exports.update = update;
function remove(req, res, next) {
    car_model_1.Car.findOneAndRemove({ _id: req.params.id }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ status: 404, message: 'Could not find the requested car.' });
        res.json({ success: true });
    });
}
exports.remove = remove;
function adoptCar(req, res, next) {
    car_model_1.Car.update({ _id: req.params.id, adoptable: true }, { $set: { adoptable: false, owner: req['payload']._id } }, function (err, result) {
        if (err)
            return next(err);
        if (result.nModified === 0)
            return next({ status: 404, message: 'Could not find the requested car.' });
        if (result.nModified > 1)
            return next({ status: 500, message: 'whoops' });
        next();
    });
}
exports.adoptCar = adoptCar;
function adoptUser(req, res, next) {
    user_model_1.User.update({ _id: req['payload']._id }, { $push: { cars: req.params.id } }, function (err, result) {
        if (err)
            return next(err);
        if (result.nModified === 0)
            return next({ status: 404, message: 'Could not find the requested user.' });
        if (result.nModified > 1)
            return next({ status: 500, message: 'whoops' });
        res.json({ success: true });
    });
}
exports.adoptUser = adoptUser;
function findAllAdopted(req, res, next) {
    car_model_1.Car
        .find({ adoptable: false })
        .populate('owner', '-password -salt')
        .exec(function (err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
}
exports.findAllAdopted = findAllAdopted;
