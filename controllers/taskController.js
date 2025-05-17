// backend/controllers/taskController.js
const Task = require("../models/Task");
const mongoose = require('mongoose');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error getting task by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
exports.getTaskStats = async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const pending = await Task.countDocuments({ status: "Pending" });
    const inProgress = await Task.countDocuments({ status: "In Progress" });
    const done = await Task.countDocuments({ status: "Done" });

    res.status(200).json({
      total,
      pending,
      inProgress,
      done,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get task stats" });
  }
};