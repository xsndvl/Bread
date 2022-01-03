//Require Mongoose
const mongoose = require("mongoose")

//Creating shorthand for the Schema constructor
const {Schema} = mongoose

const breadSchema = new Schema({
  name: {type: String, required: true},
  hasGluten: Boolean,
  image: {type: String, default: "http://placehold.it/500x500.png"},
  baker: {
    type: String,
    enum: ["Rachel", "Monica", "Joey", "Chandler", "Ross"]
  }
})

//instance method
breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}

const Bread = mongoose.model("Bread", breadSchema)

module.exports = Bread