// src/routes/carRoutes.js

const express = require("express");
const carController = require("../controllers/carController");
const validator = require("../middleware/carValidator");

const router = express.Router();

// GET all cars
router.get("/", carController.getAllCars);

// POST - Create a new car
router.post(
  "/",
  validator.carValidationRules(),
  validator.validate,
  carController.createCar
);

// GET - Retrieve a specific car by name
router.get("/:name", carController.getCarByName);

// PUT - Update a car completely by its name (replace the resource)
router.put(
  "/:name",
  validator.carValidationRules(),
  validator.validate,
  carController.updateCarByName
);

// PATCH - Partially update a car by its name (modify specific attributes of the resource)
router.patch(
  "/:name",
  validator.patchCarValidationRules(),
  validator.validate,
  carController.patchCarByName
);

module.exports = router;
