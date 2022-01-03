const mongoose = require('mongoose');
const Bread = require('./bread');
const { Schema } = mongoose;

const bakerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe'],
    },
    startDate: {
      type: Date,
      required: true,
    },
    bio: String,
  },
  { toJSON: { virtuals: true } }
);

// virtuals
bakerSchema.virtual('breads', {
  ref: 'Bread',
  localField: '_id',
  foreignField: 'baker',
});

bakerSchema.post('findOneAndDelete', async () => {
  try {
    await Bread.deleteMany({ baker: this._conditions._id });
  } catch (err) {
    throw err;
  }
});

const Baker = mongoose.model('Baker', bakerSchema);
module.exports = Baker;