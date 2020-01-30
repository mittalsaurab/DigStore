var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  things: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thing"
    }
  ]
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",userSchema)