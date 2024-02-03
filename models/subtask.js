const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  status: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  deleted_at: Date,
});

module.exports = mongoose.model("SubTask", subtaskSchema);
