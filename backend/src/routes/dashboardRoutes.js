const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getWeeklyActivity,
  getRecentActivity,
  getLearningProgress,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

// Protect all dashboard routes
router.use(protect);

// Dashboard endpoints
router.get("/stats", getDashboardStats);
router.get("/weekly-activity", getWeeklyActivity);
router.get("/recent-activity", getRecentActivity);
router.get("/progress", getLearningProgress);

module.exports = router;
