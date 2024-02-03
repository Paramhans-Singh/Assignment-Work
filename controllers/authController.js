const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

exports.loginController = async (req, res) => {
  const users = [
    {
      id: 1,
      username: "example_user",
      password: "example_password",
    },
  ];

  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { user: { id: user.id, username: user.username } },
    "czudS9lwcz"
  );
  res.json({ token });
};

exports.registerController = (req, res) => {
  const newUser = { id: 2, username: "new_user", password: "new_password" };

  const token = jwt.sign(
    { user: { id: newUser.id, username: newUser.username } },
    "czudS9lwcz"
  );
  res.json({ token });
};
