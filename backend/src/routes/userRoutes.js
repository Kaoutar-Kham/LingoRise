const express = require("express");
const router = express.Router();
const {
  getMe,
  updateProfile,
  updatePassword,
} = require("../controllers/userController");
const {
  updateProfileValidator,
  updatePasswordValidator,
} = require("../middleware/userValidator");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/me").get(getMe);
router.route("/profile").put(updateProfileValidator, updateProfile);
router.route("/password").put(updatePasswordValidator, updatePassword);

module.exports = router;
