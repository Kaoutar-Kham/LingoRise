const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const updateProfileValidator = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  handleValidationErrors,
];

const updatePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
  handleValidationErrors,
];

module.exports = {
  updateProfileValidator,
  updatePasswordValidator,
};
