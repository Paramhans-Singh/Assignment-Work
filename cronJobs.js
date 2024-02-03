const cron = require("node-cron");
const taskController = require("./controllers/taskController");
const userController = require("./controllers/userController");
const twilioController = require("./controllers/twilioController");

exports.start = () => {
  cron.schedule("0 0 * * *", () => {
    taskController.changePriorityBasedOnDueDate();
  });

  // cron.schedule("0 0 * * *", () => {...}): This task runs once a day at midnight.
  // The changePriorityBasedOnDueDate function from taskController is called, which presumably
  // changes the priority of tasks based on their due date.

  cron.schedule("0 1 * * *", async () => {
    const users = await userController.getUsersByPriority();
    for (const user of users) {
      const overdueTasks = await taskController.getOverdueTasksForUser(
        user._id
      );
      if (overdueTasks.length > 0) {
        const callSuccessful = await twilioController.makeVoiceCall(
          user.phone_number
        );
        if (callSuccessful) {
          break;
        }
      }
    }
  });
};

// cron.schedule("0 1 * * *", async () => {...}): This task runs once a day at 1 AM.
// It first fetches users by priority using the getUsersByPriority function from userController.
// Then, for each user, it fetches their overdue tasks using the getOverdueTasksForUser function
// from taskController. If a user has overdue tasks, it attempts to make a voice call to the user
// using the makeVoiceCall function from twilioController. If the call is successful,
// it breaks out of the loop and stops calling the remaining users.
