const express = require("express");
const router = express.Router();

const {
  getUserSettings,
  updateUserSettings,
} = require("../controllers/userSittingController");

const { protect } = require("../middleware/authMiddleware");
const { validateUserSettings } = require("../middleware/userSittingValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");

// All routes are protected with JWT
router.use(protect);

router
  .route("/")
  .get(getUserSettings)
  .put(validateUserSettings, handleValidationErrors, updateUserSettings);

module.exports = router;
