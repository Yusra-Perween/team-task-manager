const Project = require("../models/Project");

// Create Project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { title, description, teamMembers } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      teamMembers
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("teamMembers", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};