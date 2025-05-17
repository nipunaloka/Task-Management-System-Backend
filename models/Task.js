// backend/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  assignedTo: String,
  status: { type: String, enum: ["Pending", "In Progress", "Done"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
