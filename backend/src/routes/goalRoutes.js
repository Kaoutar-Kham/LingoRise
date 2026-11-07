const express = require("express");
const router = express.Router();

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");
const { validateGoal } = require("../middleware/goalValidator");

const handleValidationErrors = require("../middleware/handleValidationErrors");

// All routes are protected with JWT
router.use(protect);

router
  .route("/")
  .post(validateGoal, handleValidationErrors, createGoal)
  .get(getGoals);

router
  .route("/:id")
  .put(validateGoal, handleValidationErrors, updateGoal)
  .delete(deleteGoal);

module.exports = router;
