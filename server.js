const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const tasksRoutes = require("./routes/tasks");
const subtasksRoutes = require("./routes/subtasks");
const cronJobs = require("./cronJobs");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/taskapp", {});

app.use("/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/subtasks", subtasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

cronJobs.start();
