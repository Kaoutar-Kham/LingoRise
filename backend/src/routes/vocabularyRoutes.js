const express = require("express");
const router = express.Router();
const {
  addVocab,
  getVocabs,
  updateVocab,
  deleteVocab,
} = require("../controllers/vocabularyController");
const { protect } = require("../middleware/authMiddleware");

const { validateVocab } = require("../middleware/vocabValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");

// Protect all vocabulary routes
router.use(protect);

router
  .route("/")
  .post(validateVocab, handleValidationErrors, addVocab)
  .get(getVocabs);

router.route("/:id").put(updateVocab).delete(deleteVocab);

module.exports = router;
