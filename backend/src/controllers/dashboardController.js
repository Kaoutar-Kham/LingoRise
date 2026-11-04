const { Op } = require("sequelize");

const { Vocab, Goal, Language, StudySession } = require("../models");

// Helper: format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// =====================================
// GET DASHBOARD STATISTICS
// =====================================
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [
      totalWords,
      learnedWords,
      learningWords,
      totalLanguages,
      activeGoals,
      completedGoals,
      sessions,
    ] = await Promise.all([
      Vocab.count({ where: { userId } }),

      Vocab.count({
        where: { userId, mastered: true },
      }),

      Vocab.count({
        where: { userId, mastered: false },
      }),

      Language.count({
        where: { userId },
      }),

      Goal.count({
        where: {
          userId,
          status: {
            [Op.in]: ["pending", "in_progress"],
          },
        },
      }),

      Goal.count({
        where: { userId, status: "completed" },
      }),

      StudySession.findAll({
        where: { userId },
        attributes: ["durationMinutes"],
      }),
    ]);

    const totalStudyTime = sessions.reduce(
      (total, session) => total + session.durationMinutes,
      0,
    );

    return res.status(200).json({
      success: true,
      data: {
        totalWords,
        learnedWords,
        learningWords,
        totalLanguages,
        activeGoals,
        completedGoals,
        totalStudyTime,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard statistics",
    });
  }
};

// =====================================
// GET WEEKLY ACTIVITY
// =====================================
const getWeeklyActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    const startDate = new Date(today);

    startDate.setDate(today.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const sessions = await StudySession.findAll({
      where: {
        userId,
        completedAt: {
          [Op.gte]: startDate,
        },
      },
      attributes: ["durationMinutes", "completedAt"],
      order: [["completedAt", "ASC"]],
    });

    const weeklyActivity = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);

      return {
        date: formatDate(date),
        sessions: 0,
        studyTime: 0,
      };
    });

    sessions.forEach((session) => {
      const sessionDate = formatDate(new Date(session.completedAt));

      const day = weeklyActivity.find((item) => item.date === sessionDate);

      if (day) {
        day.sessions += 1;
        day.studyTime += session.durationMinutes;
      }
    });

    return res.status(200).json({
      success: true,
      data: weeklyActivity,
    });
  } catch (error) {
    console.error("Weekly Activity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve weekly activity",
    });
  }
};

// =====================================
// GET RECENT ACTIVITY
// =====================================
const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const [recentWords, recentSessions] = await Promise.all([
      Vocab.findAll({
        where: { userId },
        limit: 5,
        order: [["createdAt", "DESC"]],
      }),

      StudySession.findAll({
        where: { userId },
        limit: 5,
        order: [["completedAt", "DESC"]],
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        recentWords,
        recentSessions,
      },
    });
  } catch (error) {
    console.error("Recent Activity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve recent activity",
    });
  }
};

// =====================================
// GET LEARNING PROGRESS
// =====================================
const getLearningProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalWords, learnedWords, totalGoals, completedGoals] =
      await Promise.all([
        Vocab.count({ where: { userId } }),

        Vocab.count({
          where: { userId, mastered: true },
        }),

        Goal.count({ where: { userId } }),

        Goal.count({
          where: { userId, status: "completed" },
        }),
      ]);

    const vocabularyProgress =
      totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;

    const goalsProgress =
      totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    return res.status(200).json({
      success: true,
      data: {
        vocabulary: {
          total: totalWords,
          learned: learnedWords,
          percentage: vocabularyProgress,
        },
        goals: {
          total: totalGoals,
          completed: completedGoals,
          percentage: goalsProgress,
        },
      },
    });
  } catch (error) {
    console.error("Learning Progress Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve learning progress",
    });
  }
};

module.exports = {
  getDashboardStats,
  getWeeklyActivity,
  getRecentActivity,
  getLearningProgress,
};
