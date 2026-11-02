const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Define the StudySession model representing a user's practice/learning session
const StudySession = sequelize.define(
  "StudySession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    languageId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "language_id",
      references: {
        model: "languages",
        key: "id",
      },
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "duration_minutes",
      validate: {
        min: 1,
      },
    },
    skillType: {
      type: DataTypes.ENUM(
        "vocabulary",
        "grammar",
        "listening",
        "speaking",
        "reading",
        "writing",
      ),
      allowNull: false,
      field: "skill_type",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "completed_at",
    },
  },
  {
    tableName: "study_sessions",
    timestamps: true,
    underscored: true,
  },
);

module.exports = StudySession;
