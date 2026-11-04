const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Vocab = sequelize.define(
  "Vocab",
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
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    translation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    example: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mastered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "vocabularies",
    timestamps: true,
  },
);

module.exports = Vocab;
