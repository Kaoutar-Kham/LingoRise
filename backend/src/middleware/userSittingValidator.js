const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateUserSettings = [
  body("theme")
    .optional()
    .isIn(["light", "dark", "system"])
    .withMessage("Theme must be light, dark, or system"),
  body("notificationsEnabled")
    .optional()
    .isBoolean()
    .withMessage("Notifications enabled must be a boolean value"),
  body("dailyReminderTime")
    .optional()
    .isString()
    .withMessage("Daily reminder time must be a valid time string"),
  handleValidationErrors,
];

module.exports = {
  validateUserSettings,
};
