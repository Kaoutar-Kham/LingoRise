const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Define the Language model representing a user's language learning goal
const Language = sequelize.define(
  "Language",
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
        model: "users", // Reference to the users table
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING, // e.g. "en", "de", "fr"
      allowNull: false,
    },
    current_level: {
      type: DataTypes.ENUM("A1", "A2", "B1", "B2", "C1", "C2"),
      defaultValue: "A1",
    },
    target_level: {
      type: DataTypes.ENUM("A1", "A2", "B1", "B2", "C1", "C2"),
      defaultValue: "B2",
    },
    status: {
      type: DataTypes.ENUM("active", "paused", "completed"),
      defaultValue: "active",
    },
    started_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "languages",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Language;
