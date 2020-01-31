var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  things: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thing"
    }
  ]
})

module.exports = mongoose.model("User",userSchema)