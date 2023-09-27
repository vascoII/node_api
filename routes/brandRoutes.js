// src/routes/brandRoutes.js

const express = require("express");
const brandController = require("../controllers/brandController");
const validator = require("../middleware/brandValidator");

const router = express.Router();

// GET all brands
router.get("/", brandController.getAllBrands);

// POST - Create a new brand
router.post(
  "/",
  validator.brandValidationRules(),
  validator.validate,
  brandController.createBrand
);

// GET - Retrieve a specific brand by name
router.get("/:name", brandController.getBrandByName);

// PUT - Update a brand completely by its name (replace the resource)
router.put(
  "/:name",
  validator.brandValidationRules(),
  validator.validate,
  brandController.updateBrandByName
);

module.exports = router;
