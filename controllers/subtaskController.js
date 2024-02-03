const SubTask = require("../models/subtask");
const Task = require("../models/task");

exports.createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;

    if (!task_id) {
      return res
        .status(400)
        .json({ message: "Task ID is required for creating a subtask" });
    }

    const existingTask = await Task.findById(task_id);
    if (!existingTask) {
      return res.status(404).json({ message: "Associated task not found" });
    }

    const subtask = new SubTask({ task_id });
    await subtask.save();

    res.status(201).json({ message: "Subtask created successfully", subtask });
  } catch (error) {
    console.error("Error creating subtask:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status === undefined || status === null) {
      return res
        .status(400)
        .json({ message: "Status is required for updating a subtask" });
    }

    const subtask = await SubTask.findById(id);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    subtask.status = status;
    subtask.updated_at = new Date();
    await subtask.save();

    res.status(200).json({ message: "Subtask updated successfully", subtask });
  } catch (error) {
    console.error("Error updating subtask:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteSubTask = async (req, res) => {
  try {
    const { id } = req.params;

    const subtask = await SubTask.findById(id);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    subtask.deleted_at = new Date();
    await subtask.save();

    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (error) {
    console.error("Error deleting subtask:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUserSubTasks = async (req, res) => {
  try {
    const { task_id } = req.query;
    const filter = { deleted_at: null, ...(task_id && { task_id }) };

    const subtasks = await SubTask.find(filter);

    res.status(200).json({ subtasks });
  } catch (error) {
    console.error("Error fetching subtasks:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
