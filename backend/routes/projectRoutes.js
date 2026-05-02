const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ✅ Create Project (Admin only)
router.post("/", auth, role("Admin"), async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      teamMembers: req.body.teamMembers,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Project saved in DB",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get All Projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find().populate("teamMembers createdBy");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;