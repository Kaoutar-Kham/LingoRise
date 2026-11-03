const UserLanguage = require("../models/userLanguage");
const Language = require("../models/language");

// @desc    Add a language to user's learning list
// @route   POST /api/v1/user-languages
// @access  Private
const addUserLanguage = async (req, res) => {
  try {
    const { languageId, proficiencyLevel } = req.body;
    const userId = req.user.id; 

    const userLanguage = await UserLanguage.create({
      userId,
      languageId,
      proficiencyLevel,
    });

    res.status(201).json({
      success: true,
      data: userLanguage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get all user languages
// @route   GET /api/v1/user-languages
// @access  Private
const getUserLanguages = async (req, res) => {
  try {
    const userId = req.user.id;

    const userLanguages = await UserLanguage.findAll({
      where: { userId },
      include: [{ model: Language }],
    });

    res.status(200).json({
      success: true,
      count: userLanguages.length,
      data: userLanguages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete user language
// @route   DELETE /api/v1/user-languages/:id
// @access  Private
const deleteUserLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const userLanguage = await UserLanguage.findOne({ where: { id, userId } });

    if (!userLanguage) {
      return res.status(404).json({
        success: false,
        message: "User language not found",
      });
    }

    await userLanguage.destroy();

    res.status(200).json({
      success: true,
      message: "User language removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addUserLanguage,
  getUserLanguages,
  deleteUserLanguage,
};
