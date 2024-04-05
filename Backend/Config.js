const mongoose = require("mongoose");

const mongodb = "mongodb://localhost:27017/ecomm";

exports.main = async () => {
  try {
    await mongoose.connect(mongodb, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      useNewUrlParser: true, // For Mongoose v6 or later
      useUnifiedTopology: true, // For Mongoose v6 or later
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};
