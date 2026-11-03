const express = require("express");
const router = express.Router();
const {
  addUserLanguage,
  getUserLanguages,
  deleteUserLanguage,
} = require("../controllers/userLanguageController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router.use(protect);

router.route("/").post(addUserLanguage).get(getUserLanguages);
router.route("/:id").delete(deleteUserLanguage);

module.exports = router;
