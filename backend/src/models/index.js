const { sequelize } = require("../config/database");

// 1. Import Base Models
const User = require("./user");
const Language = require("./language");

// 2. Import Dependent Models
const UserLanguage = require("./userLanguage");
const Goal = require("./goal");
const StudySession = require("./studySession");
const Vocab = require("./vocabulary");
const UserSitting = require("./userSitting"); 

// 3. User <-> Language (Many-to-Many)
User.belongsToMany(Language, {
  through: UserLanguage,
  foreignKey: "userId",
});

Language.belongsToMany(User, {
  through: UserLanguage,
  foreignKey: "languageId",
});

// 4. UserLanguage Relations
UserLanguage.belongsTo(User, { foreignKey: "userId" });
UserLanguage.belongsTo(Language, { foreignKey: "languageId" });

// 5. User <-> Goal
User.hasMany(Goal, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Goal.belongsTo(User, { foreignKey: "userId" });

// 6. Language <-> Goal
Language.hasMany(Goal, {
  foreignKey: "languageId",
  onDelete: "CASCADE",
});

Goal.belongsTo(Language, { foreignKey: "languageId" });

// 7. User <-> StudySession
User.hasMany(StudySession, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

StudySession.belongsTo(User, { foreignKey: "userId" });

// 8. Language <-> StudySession
Language.hasMany(StudySession, {
  foreignKey: "languageId",
});

StudySession.belongsTo(Language, { foreignKey: "languageId" });

// 9. User <-> Vocabulary
User.hasMany(Vocab, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Vocab.belongsTo(User, { foreignKey: "userId" });

// 10. Language <-> Vocabulary
Language.hasMany(Vocab, {
  foreignKey: "languageId",
  onDelete: "CASCADE",
});

Vocab.belongsTo(Language, { foreignKey: "languageId" });

// 11. User <-> UserSitting One-to-One 
User.hasOne(UserSitting, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

UserSitting.belongsTo(User, { foreignKey: "userId" });

// 12. Export Models
module.exports = {
  sequelize,
  User,
  Language,
  UserLanguage,
  Goal,
  StudySession,
  Vocab,
  UserSitting, // 👈 Exportnaha hna
};
