var mongoose = require("mongoose")

var thingSchema = new mongoose.Schema({
  image_id:String,
  location: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  },
  textInfo:  String
})

module.exports = mongoose.model("Thing",thingSchema);