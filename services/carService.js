// src/services/carService.js

class CarService {
  constructor(carModel) {
    this.carModel = carModel;
  }

  async getAll() {
    return await this.carModel.find();
  }

  async getByName(name) {
    return await this.carModel.findOne({ name: name });
  }

  async create(carData) {
    // Directly checking if the car name already exists
    const existingCar = await this.carModel.findOne({ name: carData.name });
    if (existingCar) {
      throw new Error("Car with the given name already exists");
    }

    const car = new this.carModel(carData);
    return await car.save();
  }

  async updateByName(name, carData) {
    return await this.carModel.findOneAndUpdate({ name: name }, carData, {
      new: true,
      runValidators: true,
    });
  }

  async patchByName(name, carData) {
    return await this.carModel.findOneAndUpdate({ name: name }, carData, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = CarService;
