"use strict";
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    salt: String,
    fullname: { type: String, required: true },
    location: String,
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});
userSchema.method('hashPassword', function (password, done) {
    var _this = this;
    this.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(new Buffer(password), this.salt, 1000, 32, "sha512", function (err, hash) {
        if (err)
            return done(err);
        _this.password = hash.toString('hex');
        done();
    });
});
userSchema.method('comparePassword', function (password, done) {
    var _this = this;
    crypto.pbkdf2(new Buffer(password), this.salt, 1000, 32, "sha512", function (err, hash) {
        if (err)
            return done(err);
        done(null, hash.toString('hex') === _this.password);
    });
});
userSchema.method('createJWT', function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, 'apple');
});
exports.User = mongoose.model('User', userSchema);
