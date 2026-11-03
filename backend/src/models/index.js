const { sequelize } = require("../config/database"); 
const User = require("./user");
const Language = require("./language");
const UserLanguage = require("./userLanguage");
const Goal = require("./goal");
const StudySession = require("./studySession");

// Relations
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

module.exports = {
  sequelize,
  User,
  Language,
  UserLanguage,
  Goal,
  StudySession,
};
