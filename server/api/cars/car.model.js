"use strict";
var mongoose = require('mongoose');
var carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
exports.Car = mongoose.model('Car', carSchema);
