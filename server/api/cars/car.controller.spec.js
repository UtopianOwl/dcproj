'use strict';
let expect = require('expect.js');
let sinon = require('sinon');
let controller = require('./pet.controller');
let Pet = require('./pet.model').Pet;
require('sinon-mongoose');

describe('Pet Controller', () => {
  let petMock, req, res, next;
  beforeEach((done) => {
    petMock = sinon.mock(Pet);
    req = { params: {} };
    res = { json: () => { } };
    next = () => {};
    done();
  });
  afterEach((done) => {
    petMock.restore();
    done();
  });

  describe('getOne()', () => {
    it('Should call findOne() and pass in the req.param.id into the query', (done) => {
      req.params.id = 5;
      res.json = () => done();

      petMock
        .expects('findOne').withArgs({ _id: 5 })
        .chain('exec').yields(null, 10);
      controller.getOne(req, res, next);
    });
    it('Should pass err into next(err)', (done) => {
      next = (err) => {
        expect(err).to.be('ERROR!');
        done();
      }
      petMock.expects('findOne').chain('exec').yields('ERROR!');
      controller.getOne(req, res, next);
    });
    it('Should call res.json(result) on success', (done) => {
      res.json = (result) => {
        expect(result).to.be('success!');
        done();
      }
      petMock.expects('findOne').chain('exec').yields(null, 'success!');
      controller.getOne(req, res, next);
    });
    it('Should pass a custom error into next, if there is no result', (done) => {
      next = (err) => {
        expect(err).to.have.property('status');
        expect(err).to.have.property('message');
        expect(err.status).to.be(404);
        expect(err.message).to.be('Could not find pet in the database.');
        done();
      }
      petMock.expects('findOne').chain('exec').yields(null, null);
      controller.getOne(req,res,next);
    });
  });
});
