import mongoose from 'mongoose';
import connection from '../database';

const ShipSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  strength: {
    type: Number,
  },
});

export default connection.model('Ship', ShipSchema);
