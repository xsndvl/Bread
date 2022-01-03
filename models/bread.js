//Require Mongoose
const mongoose = require("mongoose")

//Creating shorthand for the Schema constructor
const {Schema} = mongoose

const breadSchema = new Schema({
  name: {type: String, required: true},
  hasGluten: Boolean,
  image: {type: String, default: "https://3emsiq36oenj2cmlhdjc290x-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/bread-making-workshop-jason-bond.jpg"},
  baker: {
    type: Schema.Types.ObjectId,
    ref: "Baker"
  }
})

//instance method
breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}

const Bread = mongoose.model("Bread", breadSchema)

module.exports = Bread