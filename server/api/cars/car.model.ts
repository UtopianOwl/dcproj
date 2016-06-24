import * as mongoose from 'mongoose';

export interface ICarModel extends ICar, mongoose.Document { }

let carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export let Car = mongoose.model('Car', carSchema);
