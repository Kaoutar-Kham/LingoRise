const express = require("express");
const router = express.Router();
const { getProgress } = require("../controllers/progressController");
const { getProgressValidator } = require("../middleware/progressValidator");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getProgressValidator, getProgress);

module.exports = router;
