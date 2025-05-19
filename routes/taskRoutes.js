const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/authMiddleware");
const {
  getTasks, addTask, updateTask, deleteTask, getTaskStats, getTaskById,
} = require("../controllers/taskController");

router.use(isAuthenticated);
router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/stats", getTaskStats);
router.get("/:id", getTaskById);
module.exports = router;
