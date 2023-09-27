// src/controllers/helpers/brandUtils.js

const Brand = require("../../models/brand");
const BrandService = require("../../services/brandService");
// We'll use dependency injection to bring in the services layer.
const brandService = new BrandService(Brand);

exports.validateBrandId = async (brand) => {
  if (brand) {
    await brandService.getBrandById({
      _id: brand,
    });
  }
};
