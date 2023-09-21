// src/models/constructor.js

const mongoose = require("mongoose");

// Define the constructor schema
const constructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove any whitespace
      unique: true, // Ensure that name values are unique
      minlength: 3,
      maxlength: 20,
    },
    foundedDate: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true, // Remove any whitespace
      minlength: 3,
      maxlength: 20,
    },
  },
  {
    timestamps: true, // Automatically include createdAt and updatedAt fields
  }
);

// Compile the schema into a model
const Constructor = mongoose.model("Car", constructorSchema);

module.exports = Constructor;
