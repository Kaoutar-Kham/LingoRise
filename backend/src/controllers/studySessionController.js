const StudySession = require("../models/studySession");
const Language = require("../models/language");

// @desc    Create a new study session
// @route   POST /api/v1/study-sessions
// @access  Private
const createStudySession = async (req, res) => {
  try {
    const { languageId, durationMinutes, skillType, notes, completedAt } =
      req.body;
    const userId = req.user.id;

    // Verify if the language exists and belongs to the user
    const language = await Language.findOne({
      where: { id: languageId, userId },
    });

    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Language not found or unauthorized",
      });
    }

    const session = await StudySession.create({
      userId,
      languageId,
      durationMinutes,
      skillType,
      notes,
      completedAt: completedAt || Date.now(),
    });

    res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get all study sessions for the logged-in user
// @route   GET /api/v1/study-sessions
// @access  Private
const getStudySessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { languageId } = req.query;

    const query = { userId };
    if (languageId) query.languageId = languageId;

    const sessions = await StudySession.findAll({
      where: query,
      order: [["completedAt", "DESC"]],
      include: [
        {
          model: Language,
          as: "Language", 
          attributes: ["name", "code"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete a study session
// @route   DELETE /api/v1/study-sessions/:id
// @access  Private
const deleteStudySession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const session = await StudySession.findOne({
      where: { id, userId },
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Study session not found",
      });
    }

    await session.destroy();

    res.status(200).json({
      success: true,
      message: "Study session deleted successfully",
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
  createStudySession,
  getStudySessions,
  deleteStudySession,
};
