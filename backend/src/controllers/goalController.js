const { Goal, Language } = require("../models");

// 1. Create a new Goal
exports.createGoal = async (req, res) => {
  try {
    const { title, description, targetDate, status, languageId } = req.body;
    const userId = req.user.id; // From auth middleware

    const goal = await Goal.create({
      userId,
      languageId,
      title,
      description,
      targetDate,
      status,
    });

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// 2. Get all goals for the logged-in user
exports.getGoals = async (req, res) => {
  try {
    const userId = req.user.id;

    const goals = await Goal.findAll({
      where: { userId },
      include: [
        {
          model: Language,
          as: "language",
          attributes: ["id", "name", "code"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// 3. Update a goal
exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const goal = await Goal.findOne({ where: { id, userId } });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found or unauthorized",
      });
    }

    await goal.update(req.body);

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// 4. Delete a goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const goal = await Goal.findOne({ where: { id, userId } });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found or unauthorized",
      });
    }

    await goal.destroy();

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
