const express = require("express");
const router = express.Router();
const {
  addVocab,
  getVocabs,
  updateVocab,
  deleteVocab,
} = require("../controllers/vocabularyController");
const { protect } = require("../middleware/authMiddleware");

// Protect all vocabulary routes
router.use(protect);

router.route("/").post(addVocab).get(getVocabs);
router.route("/:id").put(updateVocab).delete(deleteVocab);

module.exports = router;
