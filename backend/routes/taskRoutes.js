const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");


// ✅ 1. Create Task
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      projectId: req.body.projectId,
      assignedTo: req.user.id, // auto assign logged-in user
      status: req.body.status,
      deadline: req.body.deadline,
    });

    res.status(201).json({
      message: "Task saved in DB",
      task,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ 2. Get All Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate("projectId assignedTo");

    res.json({
      message: "Tasks fetched successfully",
      tasks,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ 3. Update Task Status
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({
      message: "Task updated",
      updatedTask,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ 4. Dashboard API (IMPORTANT ⭐)
router.get("/dashboard", auth, async (req, res) => {
  try {
    const tasks = await Task.find();

    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === "To Do").length,
      inProgress: tasks.filter(t => t.status === "In Progress").length,
      done: tasks.filter(t => t.status === "Done").length
    };

    res.json({
      message: "Dashboard data",
      stats
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;