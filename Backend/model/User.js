const mongoose = require("mongoose");

const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
