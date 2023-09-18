// src/config/db.js

const mongoose = require("mongoose");
const environment = require("./environment");

const connectToDatabase = async () => {
  // Determine which URI to use
  const currentURI =
    process.env.NODE_ENV === "test"
      ? environment.MONGODB_URI_TEST
      : environment.MONGODB_URI;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  };

  try {
    console.log("Connecting to database:", currentURI);

    await mongoose.connect(currentURI, options);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1); // Exit process with a failure code
  }

  mongoose.connection.on("error", (err) => {
    console.error("DB connection error:", err.message);
  });
};

module.exports = connectToDatabase;
