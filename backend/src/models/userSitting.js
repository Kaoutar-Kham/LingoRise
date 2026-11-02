const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserSetting = sequelize.define(
  "UserSetting",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    preferred_language: {
      type: DataTypes.STRING,
      defaultValue: "en",
    },
    theme: {
      type: DataTypes.STRING,
      defaultValue: "light",
    },
    notifications_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "user_settings",
    timestamps: true,
    underscored: true,
  },
);

module.exports = UserSetting;
