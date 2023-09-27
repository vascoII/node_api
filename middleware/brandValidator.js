// src/middleware/brandValidator.js

const { check, validationResult } = require("express-validator");
const utils = require("../helpers/utils");

const isValidDate = (value, { req }) => {
  // Convert and validate the date using the utility
  const dateObj = utils.isValidDateAndConvert(value);

  // Update the request body
  req.body.foundedDate = dateObj;

  return true;
};

const brandValidationRules = () => [
  check("name", "Give a Name").notEmpty(),
  check("name", "Name is 3 characters minimum, 20 characters maximum").isLength(
    { min: 3, max: 20 }
  ),
  check("foundedDate", "Give a founded date").notEmpty(),
  check("foundedDate").custom(isValidDate),
  check("country", "Give a Country").notEmpty(),
  check(
    "country",
    "Country is 3 characters minimum, 20 characters maximum"
  ).isLength({ min: 3, max: 20 }),
];

const patchBrandValidationRules = () => [
  check("name", "Give a Name").notEmpty(),
  check("name", "Name is 3 characters minimum, 20 characters maximum").isLength(
    { min: 3, max: 20 }
  ),
  check("foundedDate", "Give a founded date").notEmpty(),
  check("foundedDate").custom(isValidDate),
  check(
    "country",
    "Country is 3 characters minimum, 20 characters maximum"
  ).isLength({ min: 3, max: 20 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().reduce((acc, err) => {
    if (!acc[err.path]) {
      acc[err.path] = [];
    }
    acc[err.path].push(err.msg);
    return acc;
  }, {});

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  brandValidationRules,
  patchBrandValidationRules,
  validate,
};
