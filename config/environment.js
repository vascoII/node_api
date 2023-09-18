// src/config/environment.js

const dotenv = require("dotenv");

dotenv.config();

const environment = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/default_db",
  MONGODB_URI_TEST:
    process.env.MONGODB_URI_TEST || "mongodb://localhost:27017/test_db", // This line was added
  // Add other environment variables as needed.
};

module.exports = environment;
