const express = require("express");
const router = express.Router();

const {
  addUserLanguage,
  getUserLanguages,
  deleteUserLanguage,
} = require("../controllers/userLanguageController");

const { protect } = require("../middleware/authMiddleware");

// Protect all user language routes
router.use(protect);

// Add and get user languages
router.route("/").post(addUserLanguage).get(getUserLanguages);

// Delete a user language
router.route("/:id").delete(deleteUserLanguage);

module.exports = router;
