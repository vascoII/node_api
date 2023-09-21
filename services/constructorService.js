// src/services/constructorService.js

class ConstructorService {
  constructor(constructorModel) {
    this.constructorModel = constructorModel;
  }

  async getAll() {
    return await this.constructorModel.find();
  }

  async getByName(name) {
    return await this.constructorModel.findOne({ name: name });
  }

  async create(constructorData) {
    // Directly checking if the car name already exists
    const existingConstructor = await this.constructorModel.findOne({
      name: constructorData.name,
    });
    if (existingConstructor) {
      throw new Error("Constructor with the given name already exists");
    }

    const constructor = new this.constructorModel(constructorData);
    return await constructor.save();
  }

  async updateByName(name, constructorData) {
    return await this.constructorModel.findOneAndUpdate(
      { name: name },
      constructorData,
      {
        new: true,
        runValidators: true,
      }
    );
  }
}

module.exports = ConstructorService;
