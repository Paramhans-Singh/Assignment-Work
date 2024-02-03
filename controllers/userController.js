const User = require("../models/user");

exports.getUsersByPriority = async () => {
  try {
    const users = await User.find().sort({ priority: 1 });
    return users;
  } catch (error) {
    console.error("Error fetching users by priority:", error.message);
    throw error;
  }
};
