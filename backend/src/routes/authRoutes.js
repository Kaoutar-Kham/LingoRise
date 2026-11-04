const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/authValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");

// Public routes (avec validation des entrées)
router.post("/register", validateRegister, handleValidationErrors, register);
router.post("/login", validateLogin, handleValidationErrors, login);

// Private route (requires token)
router.get("/me", protect, getMe);

module.exports = router;
