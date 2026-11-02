const express = require("express");
const {
  createStudySession,
  getStudySessions,
  deleteStudySession,
} = require("../controllers/studySessionController");
// تصحيح: تغيير middlewares إلى middleware بالآحاد
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All study session routes require authentication
router.use(protect);

router.route("/").post(createStudySession).get(getStudySessions);
router.route("/:id").delete(deleteStudySession);

module.exports = router;
