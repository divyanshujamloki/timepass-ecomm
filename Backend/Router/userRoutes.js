const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const User = require("../model/User");

// Middleware to find user by ID and attach it to req object
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

// Routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", getUser, userController.getUserById);
router.patch("/users/:id", getUser, userController.updateUser);
router.delete("/users/:id", getUser, userController.deleteUser);

module.exports = router;
