import * as express from 'express';
import { Car, ICarModel } from './car.model';
import { User, IUserModel } from '../users/user.model';

export function getAll(req: express.Request, res: express.Response, next: Function) {
  let query = { adoptable: true };
  if (req.query.type) {
    if (req.query.type.match(/dog/i)) query['type'] = "Dog";
    else if (req.query.type.match(/cat/i)) query['type'] = "Cat";
    else if (req.query.type.match(/other/i)) query['type'] = "Other";
  }

  Car
    .find(query)
    .select('-color -location.streetAddress -location.streetAddress2')
    .exec((err, result) => {
    if (err) return next(err);
    res.json(result);
  });
}

export function getOne(req: express.Request, res: express.Response, next: Function) {
  Car
    .findOne({ _id: req.params.id })
    .exec((err, result) => {
    if (err) return next(err);
    if (!result) return next({ status: 404, message: 'Could not find car in the database.' });
    res.json(result);
  })
}

export function create(req: express.Request, res: express.Response, next: Function) {
  let p = new Car(req.body);
  p.save((err, result) => {
    if (err) return next(err);
    res.json(result);
  });
}

export function update(req: express.Request, res: express.Response, next: Function) {
  Car.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
    if (err) return next(err);
    if (!result) return next({ status: 404, message: "Could not find the requested car." });
    res.json(result);
  });
}

export function remove(req: express.Request, res: express.Response, next: Function) {
  Car.findOneAndRemove({ _id: req.params.id }, (err, result) => {
    if (err) return next(err);
    if (!result) return next({ status: 404, message: 'Could not find the requested car.' });
    res.json({ success: true })
  });
}

/**
 * ASSUME: auth is being called, so req.payload is the logged in userProperty
 * ASSUME: car id is being passed through req.params.id
 * Update the car so it is no longer adoptable, and add an owner to that car
 */
export function adoptCar(req: express.Request, res: express.Response, next: Function) {
  Car.update({ _id: req.params.id, adoptable: true }, { $set: { adoptable: false, owner: req['payload']._id } }, (err, result: any) => {
    if (err) return next(err);
    if (result.nModified === 0) return next({ status: 404, message: 'Could not find the requested car.' });
    if (result.nModified > 1) return next({ status: 500, message: 'whoops' });
    next();
  });
}
/**
 * ASSUME: auth is being called, so req.payload is the logged in userProperty
 * ASSUME: car id is being passed through req.params.id
 * Update the user, to push a car into the cars array
 */
export function adoptUser(req: express.Request, res: express.Response, next: Function) {
  User.update({ _id: req['payload']._id }, { $push: { cars: req.params.id } }, (err, result: any) => {
    if (err) return next(err);
    if (result.nModified === 0) return next({ status: 404, message: 'Could not find the requested user.' });
    if (result.nModified > 1) return next({ status: 500, message: 'whoops' });
    res.json({ success: true });
  });
}

export function findAllAdopted(req: express.Request, res: express.Response, next: Function) {
  Car
    .find({ adoptable: false })
    .populate('owner', '-password -salt')
    .exec((err, data) => {
      if (err) return next(err);
      res.json(data);
    });
}
