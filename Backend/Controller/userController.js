const User = require("../model/User");
var jwt = require("jsonwebtoken");
require("dotenv").config();

// Controller functions

exports.getAllUsers = async (req, res) => {

  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getUserById = async (req, res) => {
  res.json(res.user);
};

exports.updateUser = async (req, res) => {
  try {
    await res.user.updateOne(req.body);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Check if res.user is populated with the user document
    if (!res.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Call findByIdAndDelete() function on the User model
    const deletedUser = await User.findByIdAndDelete(res.user._id);

    // Check if the user was successfully deleted
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
