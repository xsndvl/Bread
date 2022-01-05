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

bakerSchema.post("findOneAndDelete", function() {
    console.log(this)
    Bread.deleteMany({baker: this._conditions._id})
        .then(deleteStatus => console.log(deleteStatus))
})

const Baker = mongoose.model('Baker', bakerSchema);
module.exports = Baker;