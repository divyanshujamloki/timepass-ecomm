require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
var jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
  const user = new User(req.body);


    try {
        var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
           const saltRounds = 10;
           const salt = bcrypt.genSaltSync(saltRounds);

           // Hash the password
           const hashedPassword = bcrypt.hashSync(req.body.password, salt);

           // Set the hashed password and token in the user object
           user.password = hashedPassword;
        user.token = token;
     
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    // Find the user with the provided email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

      console.log(
        "CNJSDHN",
        isMatch,
        "fdsafdaf",
        req.body.password,
        "safcads",
        user.password,
        "mail",
        req.body.email,
        "useer ",
        user
      );
    if (isMatch) {
      // If the password matches, generate a JWT token
        const token = jwt.sign({ email: user.email }, process.env.SECRET);
        user.token = token;
        user.save()
      res.json({ token });
    } else {
      // If the password doesn't match, return a 401 Unauthorized status code
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



