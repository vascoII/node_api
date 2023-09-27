// src/models/brand.js

const mongoose = require("mongoose");

// Define the brand schema
const brandSchema = new mongoose.Schema(
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
      set: (value) => {
        const [day, month, year] = value
          .split("/")
          .map((num) => parseInt(num, 10));
        return new Date(year, month - 1, day);
      },
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
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
