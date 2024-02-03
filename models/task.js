const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  due_date: Date,
  priority: Number,
  status: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  deleted_at: Date,
});

module.exports = mongoose.model("Task", taskSchema);
