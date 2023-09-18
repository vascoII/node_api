// src/controllers/carController.js

const Car = require("../models/car");
const CarService = require("../services/carService");

// We'll use dependency injection to bring in the service layer.
const carService = new CarService(Car);

exports.getAllCars = async (req, res) => {
  try {
    const cars = await carService.getAll();
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    const result = await carService.create(req.body);
    res.status(201).json({ car: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCarByName = async (req, res) => {
  try {
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
    const patchedCar = await carService.patchByName(req.params.name, req.body);
    if (!patchedCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(patchedCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
