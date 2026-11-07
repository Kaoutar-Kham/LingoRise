const UserSetting = require("../models/userSitting");

// @desc    Get user settings
// @route   GET /api/v1/user-settings
// @access  Private
const getUserSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    let settings = await UserSetting.findOne({
      where: { userId },
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await UserSetting.create({
        userId,
        theme: "dark",
        notificationsEnabled: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update user settings
// @route   PUT /api/v1/user-settings
// @access  Private
const updateUserSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { theme, notificationsEnabled, dailyReminderTime } = req.body;

    let settings = await UserSetting.findOne({
      where: { userId },
    });

    // Create settings if they don't exist
    if (!settings) {
      settings = await UserSetting.create({
        userId,
        theme: theme ?? "dark",
        notificationsEnabled: notificationsEnabled ?? true,
        dailyReminderTime: dailyReminderTime ?? null,
      });
    } else {
      // Update only provided fields
      if (theme !== undefined) {
        settings.theme = theme;
      }

      if (notificationsEnabled !== undefined) {
        settings.notificationsEnabled = notificationsEnabled;
      }

      if (dailyReminderTime !== undefined) {
        settings.dailyReminderTime = dailyReminderTime;
      }

      await settings.save();
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getUserSettings,
  updateUserSettings,
};
