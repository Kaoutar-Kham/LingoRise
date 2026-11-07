const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); 
const UserSitting = sequelize.define(
  "UserSitting",
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
    theme: {
      type: DataTypes.STRING,
      defaultValue: "dark",
    },
    notificationsEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    dailyReminderTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "user_sittings",
    timestamps: true,
  },
);

module.exports = UserSitting;
