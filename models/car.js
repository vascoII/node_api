// src/models/car.js

const mongoose = require("mongoose");

// Define the car schema
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove any whitespace
      unique: true, // Ensure that name values are unique
      minlength: 4,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 200,
    },
  },
  {
    timestamps: true, // Automatically include createdAt and updatedAt fields
  }
);

// Compile the schema into a model
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
