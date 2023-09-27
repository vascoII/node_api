// src/controllers/brandController.js

const brand = require("../models/brand");
const BrandService = require("../services/brandService");

// We'll use dependency injection to bring in the service layer.
const brandService = new BrandService(brand);

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await brandService.getAll();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBrandByName = async (req, res) => {
  try {
    const brand = await brandService.getByName(req.params.name);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const createdBrand = await brandService.create(req.body);
    res.status(201).json({ brand: createdBrand });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBrandByName = async (req, res) => {
  try {
    const updatedBrand = await brandService.updateByName(
      req.params.name,
      req.body
    );
    if (!updatedBrand) {
      return res.status(404).json({ error: "brand not found" });
    }
    res.status(200).json(updatedBrand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
