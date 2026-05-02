const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String 
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true   // ✅ ensures task must be assigned
  },

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do"
  },

  deadline: {
    type: Date
  }

}, { timestamps: true });  // ✅ adds createdAt & updatedAt

module.exports = mongoose.model("Task", taskSchema);