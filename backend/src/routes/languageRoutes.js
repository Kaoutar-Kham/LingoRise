const express = require("express");
const router = express.Router();
const languageController = require("../controllers/languageController");
const { protect } = require("../middleware/authMiddleware");

// Protect all language routes with authentication middleware
router.use(protect);

// CRUD Endpoints for languages
router.post("/", languageController.createLanguage);
router.get("/", languageController.getLanguages);
router.get("/:id", languageController.getLanguageById);
router.put("/:id", languageController.updateLanguage);
router.delete("/:id", languageController.deleteLanguage);

module.exports = router;
