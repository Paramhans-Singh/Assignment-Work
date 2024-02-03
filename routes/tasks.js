const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, taskController.createTask);
router.put("/update/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);
router.get("/", authMiddleware, taskController.getAllUserTasks);

module.exports = router;
