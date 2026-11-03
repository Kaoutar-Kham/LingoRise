const { sequelize } = require("../config/database");
const User = require("./user");
const UserSetting = require("./userSitting");
const Language = require("./language");
const StudySession = require("./studySession");
const Goal = require("./goal");

// User relations
User.hasMany(Language, { foreignKey: "userId", onDelete: "CASCADE" });
Language.belongsTo(User, { foreignKey: "userId" });

User.hasMany(StudySession, { foreignKey: "userId", onDelete: "CASCADE" });
StudySession.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Goal, { foreignKey: "userId", onDelete: "CASCADE" });
Goal.belongsTo(User, { foreignKey: "userId" });

// Language relations
Language.hasMany(StudySession, {
  foreignKey: "languageId",
  onDelete: "CASCADE",
});
StudySession.belongsTo(Language, { foreignKey: "languageId", as: "language" });

Language.hasMany(Goal, { foreignKey: "languageId", onDelete: "CASCADE" });
Goal.belongsTo(Language, { foreignKey: "languageId", as: "language" });

module.exports = {
  sequelize,
  User,
  UserSetting,
  Language,
  StudySession,
  Goal,
};
