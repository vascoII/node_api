// src/routes/constructorRoutes.js

const express = require("express");
const constructorController = require("../controllers/constructorController");
const validator = require("../middleware/constructorValidator");

const router = express.Router();

// GET all constructors
router.get("/", constructorController.getAllConstructors);

// POST - Create a new constructor
router.post(
  "/",
  validator.constructorValidationRules(),
  validator.validate,
  constructorController.createConstructor
);

// GET - Retrieve a specific constructor by name
router.get("/:name", constructorController.getConstructorByName);

// PUT - Update a constructor completely by its name (replace the resource)
router.put(
  "/:name",
  validator.constructorValidationRules(),
  validator.validate,
  constructorController.updateConstructorByName
);

module.exports = router;
