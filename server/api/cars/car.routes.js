"use strict";
var express = require('express');
var jwt = require('express-jwt');
var controller = require('./car.controller');
var router = express.Router();
var auth = jwt({
    secret: 'apple',
    userProperty: 'payload'
});
router.get('/', controller.getAll);
router.get('/adopted', controller.findAllAdopted);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/adopt/:id', auth, controller.adoptCar, controller.adoptUser);
router.delete('/:id', controller.remove);
module.exports = router;
