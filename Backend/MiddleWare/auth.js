require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
var jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.auth = (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.get("Authorization")) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    // Extract token from Authorization header
    var token = req.get("Authorization").split("Bearer ")[1];
    console.log("CHECK TOKEN: ", token);

    // Verify token and decode it
    var decoded = jwt.verify(token, process.env.SECRET);
    console.log("DECODED TOKEN: ", decoded);

    // Check if decoded token contains email
    if (!decoded.email) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
