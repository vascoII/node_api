// src/controllers/carController.js

const Car = require("../models/car");
const CarService = require("../services/carService");
const brandUtils = require("./helpers/brandUtils");

// We'll use dependency injection to bring in the services layer.
const carService = new CarService(Car);

exports.getAllCarsBybrand = async (req, res) => {
  try {
    const cars = await carService.getAllBybrand(req.params.brandId);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCarByName = async (req, res) => {
  try {
    const car = await carService.getByName(req.params.name);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createCar = async (req, res) => {
  try {
    const { brand, ...carData } = req.body;
    await brandUtils.validateBrandId(brand);

    const result = await carService.create(carData, brand);
    res.status(201).json({ car: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCarByName = async (req, res) => {
  try {
    const { brand } = req.body;
    await brandUtils.validateBrandId(brand);

    const updatedCar = await carService.updateByName(req.params.name, req.body);
    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.patchCarByName = async (req, res) => {
  try {
    const { brand } = req.body;
    if (brand) {
      await brandUtils.validateBrandId(brand);
    }

    const patchedCar = await carService.patchByName(req.params.name, req.body);
    if (!patchedCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(patchedCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
