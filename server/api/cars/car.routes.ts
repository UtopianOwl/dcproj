import * as express from 'express';
import * as jwt from 'express-jwt';
import * as controller from './car.controller';

const router = express.Router();
// TODO: change secret to process.env
// TODO: change secret before publishing
const auth = jwt({
  secret: 'apple',
  userProperty: 'payload'
});

// Base Url -- /api/v1/cars

// GET: /api/v1/cars => Car[]
router.get('/', controller.getAll);

// GET: /api/v1/cars/adopted => Car[]
router.get('/adopted', controller.findAllAdopted);

// GET: /api/v1/cars/:id => Car
// id => Car._id
router.get('/:id', controller.getOne);

// POST: /api/v1/cars => Car
router.post('/', controller.create);

// PUT: /api/v1/cars/:id => Car
// id => Car._id
router.put('/:id', controller.update);

// PUT: /api/v1/cars/adopt/:id => Car
// id => Car._id
router.put('/adopt/:id', auth, controller.adoptCar, controller.adoptUser);

// DELETE: /api/v1/cars/:id => { success: true/false }
// id => Car._id
router.delete('/:id', controller.remove);



export = router;
