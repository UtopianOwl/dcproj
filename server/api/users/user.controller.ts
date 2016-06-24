import * as express from 'express';
import { User, IUserModel } from './user.model';
import { Car, ICarModel } from "../cars/car.model";

// If you visit /user/:id/cars, then you can see all of a user's cars
export function fetchCars(req: express.Request, res: express.Response, next: Function) {
  Car
    .find({ owner: req.params.id })
    .exec((err, cars: ICarModel[]) => {
      if (err)
        return next(err);

      res.json(cars);
    });
}

// If you POST /user/:id/cars, you can create a new car
export function createCar(req: express.Request, res: express.Response, next: Function) {
  Car.create(req.body, (err, car: ICarModel) => {
    if (err)
      return next(err);

    car.owner = req.params.id;
    car.save((err, result: ICarModel) => {
      if (err)
        return next(err);

      res.json({ success: true, car: result });
    });
  });
}

export function login(req: express.Request, res: express.Response, next: Function) {
  User
    .findOne({ username: req.body.username })
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next({ status: 401, message: 'No such user.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) return next({ status: 401, message: 'Invalid email/password combination.' });
        res.json({ token: user.createJWT(), user: user });
      });
    });
}

export function register(req: express.Request, res: express.Response, next: Function) {
  User.create(req.body, (err, user: IUserModel) => {
    if (err)
      return next(err);

    user.hashPassword(req.body.password, (err) => {
      if (err)
        return next(err);

      user.save((err, data: IUserModel) => {
        if (err)
          return next(err);

        res.json({ token: data.createJWT() });
      })
    });
  });
}
