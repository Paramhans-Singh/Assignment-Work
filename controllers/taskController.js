const Task = require("../models/task");
const SubTask = require("../models/subtask");

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title || !description || !due_date) {
      return res.status(400).json({
        message:
          "Title, description, and due_date are required for creating a task",
      });
    }

    const priority = calculatePriority(due_date);

    const task = new Task({
      title,
      description,
      due_date,
      priority,
      status: "TODO",
    });
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { due_date, status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (due_date !== undefined && due_date !== null) {
      task.due_date = due_date;
      task.priority = calculatePriority(due_date);
    }

    if (status === "TODO" || status === "DONE") {
      task.status = status;
    }

    await task.save();

    if (status !== undefined && status !== null) {
      await updateSubTasksStatus(id, status);
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.deleted_at = new Date();
    await task.save();

    await softDeleteSubTasks(id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUserTasks = async (req, res) => {
  try {
    const { priority, due_date, page, pageSize } = req.query;
    const filter = {
      deleted_at: null,
      ...(priority && { priority }),
      ...(due_date && { due_date }),
    };

    const options = {
      skip: (page - 1) * pageSize,
      limit: parseInt(pageSize),
    };

    const tasks = await Task.find(filter, null, options);

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const calculatePriority = (due_date) => {
  const today = new Date();
  const differenceInDays = Math.ceil(
    (due_date - today) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays === 0) {
    return 0;
  } else if (differenceInDays <= 2) {
    return 1;
  } else if (differenceInDays <= 4) {
    return 2;
  } else {
    return 3;
  }
};

const updateSubTasksStatus = async (task_id, status) => {
  const subtasks = await SubTask.find({ task_id });
  for (const subtask of subtasks) {
    subtask.status = status === "DONE" ? 1 : 0;
    await subtask.save();
  }
};

const softDeleteSubTasks = async (task_id) => {
  const subtasks = await SubTask.find({ task_id });
  for (const subtask of subtasks) {
    subtask.deleted_at = new Date();
    await subtask.save();
  }
};

exports.changePriorityBasedOnDueDate = async () => {
  try {
    const todayTasks = await Task.find({
      due_date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
      status: { $ne: "DONE" },
    });

    await updatePriority(todayTasks, 0);

    const tomorrowTasks = await Task.find({
      due_date: {
        $gte: new Date().setHours(0, 0, 0, 0) + 2 * 24 * 60 * 60 * 1000,
        $lt: new Date().setHours(23, 59, 59, 999) + 2 * 24 * 60 * 60 * 1000,
      },
      status: { $ne: "DONE" },
    });

    await updatePriority(tomorrowTasks, 1);

    const threeToFourDaysTasks = await Task.find({
      due_date: {
        $gte: new Date().setHours(0, 0, 0, 0) + 4 * 24 * 60 * 60 * 1000,
        $lt: new Date().setHours(23, 59, 59, 999) + 4 * 24 * 60 * 60 * 1000,
      },
      status: { $ne: "DONE" },
    });

    await updatePriority(threeToFourDaysTasks, 2);

    const fivePlusDaysTasks = await Task.find({
      due_date: {
        $gte: new Date().setHours(0, 0, 0, 0) + 5 * 24 * 60 * 60 * 1000,
      },
      status: { $ne: "DONE" },
    });

    await updatePriority(fivePlusDaysTasks, 3);

    console.log("Task priorities updated based on due date.");
  } catch (error) {
    console.error(
      "Error updating task priorities based on due date:",
      error.message
    );
    throw error;
  }
};

const updatePriority = async (tasks, priority) => {
  for (const task of tasks) {
    task.priority = priority;
    await task.save();
  }
};

exports.getOverdueTasksForUser = async (userId) => {
  try {
    const overdueTasks = await Task.find({
      priority: { $gte: 1 },
      status: "TODO",
      deleted_at: null,
      user: userId,
      due_date: { $lt: new Date() },
    });

    return overdueTasks;
  } catch (error) {
    console.error("Error fetching overdue tasks for user:", error.message);
    throw error;
  }
};
