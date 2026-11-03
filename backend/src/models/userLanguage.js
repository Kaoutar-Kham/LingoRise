const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserLanguage = sequelize.define(
  "UserLanguage",
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
      allowNull: false,
    },
    proficiencyLevel: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced", "fluent"),
      defaultValue: "beginner",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = UserLanguage;
