// src/models/car.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the car schema
const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove any whitespace
      unique: true, // Ensure that name values are unique
      minlength: 2,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 200,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically include createdAt and updatedAt fields
  }
);

// Compile the schema into a model
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
