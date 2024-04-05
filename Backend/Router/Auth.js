const express = require("express");
const router = express.Router();
const userController = require("../Authentication/CreateUser");
const User = require("../model/User");


router.post("/signup", userController.createUser);
router.post("/login", userController.login);

module.exports = router;