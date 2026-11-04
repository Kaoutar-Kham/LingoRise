const { body } = require("express-validator");

const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Le nom d'utilisateur est obligatoire")
    .isLength({ min: 3 })
    .withMessage("Le nom d'utilisateur doit contenir au moins 3 caractères"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Veuillez fournir un email valide"),
  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Veuillez fournir un email valide"),
  body("password").notEmpty().withMessage("Le mot de passe est obligatoire"),
];

module.exports = {
  validateRegister,
  validateLogin,
};
