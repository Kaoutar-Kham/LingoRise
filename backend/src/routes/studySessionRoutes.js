const express = require("express");
const router = express.Router();

const {
  createStudySession,
  getStudySessions,
  deleteStudySession,
} = require("../controllers/studySessionController");

const { protect } = require("../middleware/authMiddleware");

const { validateStudySession } = require("../middleware/studySessionValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");

router.use(protect);

router
  .route("/")
  .post(validateStudySession, handleValidationErrors, createStudySession)
  .get(getStudySessions);

router.route("/:id").delete(deleteStudySession);

module.exports = router;
