const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected with JWT
router.use(protect);

router.route("/").post(createGoal).get(getGoals);

router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
