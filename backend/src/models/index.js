const { sequelize } = require("../config/database");

// 1. Import Base Models FIRST so tables are created in correct order
const User = require("./user");
const Language = require("./language");

// 2. Import Dependent/Through Models SECOND
const UserLanguage = require("./userLanguage");
const Goal = require("./goal");
const StudySession = require("./studySession");
const Vocab = require("./vocabulary");

// 3. Define Associations and Relations
User.belongsToMany(Language, { through: UserLanguage, foreignKey: "userId" });
Language.belongsToMany(User, {
  through: UserLanguage,
  foreignKey: "languageId",
});

UserLanguage.belongsTo(User, { foreignKey: "userId" });
UserLanguage.belongsTo(Language, { foreignKey: "languageId" });

User.hasMany(Goal, { foreignKey: "userId", onDelete: "CASCADE" });
Goal.belongsTo(User, { foreignKey: "userId" });

Language.hasMany(Goal, { foreignKey: "languageId", onDelete: "CASCADE" });
Goal.belongsTo(Language, { foreignKey: "languageId" });

User.hasMany(StudySession, { foreignKey: "userId", onDelete: "CASCADE" });
StudySession.belongsTo(User, { foreignKey: "userId" });

// Vocab Relations
User.hasMany(Vocab, { foreignKey: "userId", onDelete: "CASCADE" });
Vocab.belongsTo(User, { foreignKey: "userId" });

Language.hasMany(Vocab, { foreignKey: "languageId", onDelete: "CASCADE" });
Vocab.belongsTo(Language, { foreignKey: "languageId" });

module.exports = {
  sequelize,
  User,
  Language,
  UserLanguage,
  Goal,
  StudySession,
  Vocab,
};
