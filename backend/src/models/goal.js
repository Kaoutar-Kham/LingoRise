const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Goal = sequelize.define(
  "Goal",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    languageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    targetDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Goal;
