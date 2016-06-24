"use strict";
var express = require('express');
var controller = require('./user.controller');
var router = express.Router();
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/:id/cars', controller.fetchCars);
router.post('/:id/cars', controller.createCar);
module.exports = router;
