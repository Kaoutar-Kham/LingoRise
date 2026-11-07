const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/authValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");

console.log("--> Check protect:", typeof authMiddleware.protect);
console.log("--> Check getMe:", typeof authController.getMe);

router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  authController.register,
);
router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  authController.login,
);

router.get("/me", authMiddleware.protect, authController.getMe);

module.exports = router;
