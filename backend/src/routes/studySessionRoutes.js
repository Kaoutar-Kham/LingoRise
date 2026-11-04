const express = require("express");
const {
  createStudySession,
  getStudySessions,
  deleteStudySession,
} = require("../controllers/studySessionController");
const { protect } = require("../middleware/authMiddleware");

// Import dyal middleware validation
const { validateStudySession } = require("../middleware/studySessionValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");

const router = express.Router();

// All study session routes require authentication
router.use(protect);

router
  .route("/")
  .post(validateStudySession, handleValidationErrors, createStudySession)
  .get(getStudySessions);

router.route("/:id").delete(deleteStudySession);

module.exports = router;
