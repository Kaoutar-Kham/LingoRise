const { Language } = require("../models");

// 1. Create a new language entry for the authenticated user
exports.createLanguage = async (req, res) => {
  try {
    const { name, code, current_level, target_level, status, started_at } =
      req.body;

    const language = await Language.create({
      userId: req.user.id, // Link language to the logged-in user
      name,
      code,
      current_level,
      target_level,
      status,
      started_at,
    });

    return res.status(201).json({ success: true, data: language });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Retrieve all languages belonging to the authenticated user
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll({
      where: { userId: req.user.id },
    });

    return res.status(200).json({ success: true, data: languages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Retrieve a specific language by ID for the authenticated user
exports.getLanguageById = async (req, res) => {
  try {
    const language = await Language.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!language) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }

    return res.status(200).json({ success: true, data: language });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update a language entry by ID
exports.updateLanguage = async (req, res) => {
  try {
    const language = await Language.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!language) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }

    await language.update(req.body);

    return res.status(200).json({ success: true, data: language });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete a language entry by ID
exports.deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!language) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }

    await language.destroy();

    return res
      .status(200)
      .json({ success: true, message: "Language deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
