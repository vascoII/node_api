// src/middleware/carValidator.js

const { check, validationResult } = require("express-validator");

const carValidationRules = () => [
  check("brand", "Give a Brand ID").notEmpty(),
  check("brand", "Brand ID is invalid").isMongoId(),
  check("name", "Give a Name").notEmpty(),
  check("name", "Name is 2 characters minimum, 20 characters maximum").isLength(
    { min: 2, max: 20 }
  ),
  check("description", "Give a Description").notEmpty(),
  check(
    "description",
    "Description is 4 characters minimum, 200 characters maximum"
  ).isLength({ min: 4, max: 200 }),
];

const patchCarValidationRules = () => [
  check("name", "Name is 2 characters minimum, 20 characters maximum")
    .optional()
    .isLength({ min: 2, max: 20 }),
  check(
    "description",
    "Description is 4 characters minimum, 200 characters maximum"
  )
    .optional()
    .isLength({ min: 4, max: 200 }),
  check("brand", "Give a brand ID").optional().notEmpty(),
  check("brand", "Constructor ID is invalid").optional().isMongoId(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().reduce((acc, err) => {
    console.log(acc);
    if (!acc[err.path]) {
      acc[err.path] = [];
    }
    acc[err.path].push(err.msg);
    return acc;
  }, {});

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  carValidationRules,
  patchCarValidationRules,
  validate,
};
