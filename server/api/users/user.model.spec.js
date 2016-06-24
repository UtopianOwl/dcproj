'use strict';
let expect = require('expect.js');
let User = require('./user.model').User;
let sinon = require('sinon');

describe('User Model', () => {
  describe('comparePassword()', () => {
    let cryptoMock;
    beforeEach(() => {
      cryptoMock = sinon.mock(require('crypto'));
    });
    afterEach(() => {
      cryptoMock.restore();
    });
    it('pbkdf2 should take the proper arguments => password, this.salt, 1000, 32', (done) => {
      let u = new User({ salt: 'salt' });
      cryptoMock.expects('pbkdf2').withArgs('password', 'salt', 1000, 32).yields(null, { toString: () => "" });
      u.comparePassword('password', (err, isMatch) => {
        done();
      });
    });
    it('Should return false, if pbkdf2 returns the same hash', (done) => {
      let u = new User({ password: 'user password'});
      cryptoMock.expects('pbkdf2').yields(null, { toString: () => "user password" })
      u.comparePassword('password', (err, isMatch) => {
        expect(err).to.be(null);
        expect(isMatch).to.be(true);
        done();
      });
    })
    it('Should return false, if pbdkf2 returns a different hash', (done) => {
      let u = new User({ password: 'user password' });
      cryptoMock.expects('pbkdf2').yields(null, { toString: () => 'other password' });
      u.comparePassword('password', (err, isMatch) => {
        expect(isMatch).to.be(false);
        done();
      });
    });
    it('Should call toString("hex") on the hash buffer', (done) => {
      let u = new User();
      let toString = function(args) {
        expect(args).to.be("hex");
        return "";
      }
      cryptoMock.expects('pbkdf2').yields(null, { toString: toString });
      u.comparePassword('password', (err, isMatch) => {
        done();
      });
    });
    it('Should call done() and pass the error as an argument if pbkdf2 returns an error', (done) => {
      let u = new User();
      cryptoMock.expects('pbkdf2').yields('ERROR!');
      u.comparePassword('password', (err, isMatch) => {
        expect(err).to.be("ERROR!");
        done();
      });
    });
  });
});
