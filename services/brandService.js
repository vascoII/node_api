// src/services/brandService.js

class brandService {
  constructor(brandModel) {
    this.brandModel = brandModel;
  }

  async getBrandById(id) {
    const brand = await this.brandModel.findOne({ _id: id });
    if (!brand) {
      throw new Error("Brand with the given id does not exist");
    }
    return brand;
  }

  async getAll() {
    return await this.brandModel.find();
  }

  async getByName(name) {
    return await this.brandModel.findOne({ name: name });
  }

  async create(brandData) {
    // Directly checking if the car name already exists
    const existingBrand = await this.brandModel.findOne({
      name: brandData.name,
    });
    if (existingBrand) {
      throw new Error("brand with the given name already exists");
    }

    const brand = new this.brandModel(brandData);
    return await brand.save();
  }

  async updateByName(name, brandData) {
    return await this.brandModel.findOneAndUpdate({ name: name }, brandData, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = brandService;
