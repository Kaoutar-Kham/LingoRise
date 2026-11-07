const { query } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const getProgressValidator = [
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date (YYYY-MM-DD)"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date (YYYY-MM-DD)"),
  handleValidationErrors,
];

module.exports = {
  getProgressValidator,
};
