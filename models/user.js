const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone_number: String,
  priority: Number,
  username: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
