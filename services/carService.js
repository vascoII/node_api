// src/services/carService.js

class CarService {
  constructor(carModel) {
    this.carModel = carModel;
  }

  async getAllBybrand(brandId) {
    return await this.carModel.find({ brand: brandId });
  }

  async getByName(name) {
    return await this.carModel.findOne({ name: name });
  }

  async create(carData, brand) {
    const existingCar = await this.carModel.findOne({ name: carData.name });
    if (existingCar) {
      throw new Error("Car with the given name already exists");
    }

    carData.brand = brand;
    const newCar = new this.carModel(carData);
    return await newCar.save();
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
