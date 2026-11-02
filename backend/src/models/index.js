const { sequelize } = require("../config/database");
const User = require("./user");
const UserSetting = require("./userSitting");
const Language = require("./language");
// Définir les associations
User.hasMany(Language, { foreignKey: "userId", onDelete: "CASCADE" });
Language.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  UserSetting,
  Language,
};
