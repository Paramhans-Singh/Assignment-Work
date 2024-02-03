const express = require("express");
const router = express.Router();
const subtaskController = require("../controllers/subtaskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, subtaskController.createSubTask);
router.put("/update/:id", authMiddleware, subtaskController.updateSubTask);
router.delete("/:id", authMiddleware, subtaskController.deleteSubTask);
router.get("/", authMiddleware, subtaskController.getAllUserSubTasks);

module.exports = router;
