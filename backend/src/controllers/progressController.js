const { StudySession, Goal, UserLanguage } = require("../models");

// @desc    Get user progress and statistics
// @route   GET /api/v1/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalSessions = await StudySession.count({ where: { userId } });

    const goals = await Goal.findAll({ where: { userId } });

    const userLanguages = await UserLanguage.findAll({ where: { userId } });

    res.status(200).json({
      success: true,
      data: {
        totalSessions,
        goalsCount: goals.length,
        languagesCount: userLanguages.length,
      },
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
  getProgress,
};
