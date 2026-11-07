const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const createUserLanguageValidator = [
  body("languageId")
    .notEmpty()
    .withMessage("Language ID is required")
    .isUUID()
    .withMessage("Invalid Language ID format"),
  body("proficiencyLevel")
    .optional()
    .isString()
    .withMessage("Proficiency level must be a string"),
  handleValidationErrors,
];

module.exports = {
  createUserLanguageValidator,
};
