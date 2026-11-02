const { sequelize } = require("../config/database");
const User = require("./user");
const UserSetting = require("./userSitting");
const Language = require("./language");
const StudySession = require("./studySession"); 

User.hasMany(Language, { foreignKey: "userId", onDelete: "CASCADE" });
Language.belongsTo(User, { foreignKey: "userId" });

User.hasMany(StudySession, { foreignKey: "userId", onDelete: "CASCADE" });
StudySession.belongsTo(User, { foreignKey: "userId" });

Language.hasMany(StudySession, {
  foreignKey: "languageId",
  onDelete: "CASCADE",
});
StudySession.belongsTo(Language, { foreignKey: "languageId", as: "language" });

module.exports = {
  sequelize,
  User,
  UserSetting,
  Language,
  StudySession,
};
