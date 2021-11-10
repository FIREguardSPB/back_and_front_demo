import mongoose from 'mongoose';

const Card = new mongoose.Schema({
  fio: {type: String, required: true},
  numberPhone: {type: String, required: true},
  address: {type: String, required: true},
  fias: {type: String, required: true},
  date_created: {type: Date, required: true},
  deleted: {type: Boolean, required: true, default: false}
})
export default mongoose.model('Card', Card)