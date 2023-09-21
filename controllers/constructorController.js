// src/controllers/constructorController.js

const Constructor = require("../models/constructor");
const ConstructorService = require("../services/constructorService");

// We'll use dependency injection to bring in the service layer.
const constructorService = new ConstructorService(Constructor);

exports.getAllConstructors = async (req, res) => {
  try {
    const constructors = await constructorService.getAll();
    res.status(200).json(constructors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getConstructorByName = async (req, res) => {
  try {
    const constructor = await constructorService.getByName(req.params.name);
    if (!constructor) {
      return res.status(404).json({ error: "Constructor not found" });
    }
    res.status(200).json(constructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createConstructor = async (req, res) => {
  try {
    const result = await constructorService.create(req.body);
    res.status(201).json({ constructor: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateConstructorByName = async (req, res) => {
  try {
    const updatedConstructor = await constructorService.updateByName(
      req.params.name,
      req.body
    );
    if (!updatedConstructor) {
      return res.status(404).json({ error: "Constructor not found" });
    }
    res.status(200).json(updatedConstructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
