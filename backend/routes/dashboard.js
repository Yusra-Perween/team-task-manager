const router = require("express").Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    const total = tasks.length;
    const done = tasks.filter(t => t.status === "Done").length;
    const pending = tasks.filter(t => t.status !== "Done").length;

    const overdue = tasks.filter(
      t => t.deadline && new Date(t.deadline) < new Date()
    ).length;

    res.json({ total, done, pending, overdue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;