// src/middleware/carValidator.js

const { check, validationResult } = require("express-validator");

const carValidationRules = () => [
  check("name", "Give a Name").notEmpty(),
  check("name", "Name is 4 characters minimum, 20 characters maximum").isLength(
    { min: 4, max: 20 }
  ),
  check("description", "Give a Description").notEmpty(),
  check(
    "description",
    "Description is 4 characters minimum, 200 characters maximum"
  ).isLength({ min: 4, max: 200 }),
];

const patchCarValidationRules = () => [
  check("name", "Name is 4 characters minimum, 20 characters maximum")
    .optional()
    .isLength({ min: 4, max: 20 }),
  check(
    "description",
    "Description is 4 characters minimum, 200 characters maximum"
  )
    .optional()
    .isLength({ min: 4, max: 200 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  carValidationRules,
  patchCarValidationRules,
  validate,
};
