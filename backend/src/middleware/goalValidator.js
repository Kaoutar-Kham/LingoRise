const { body } = require("express-validator");

const validateGoal = [
  body("title")
    .notEmpty()
    .withMessage("Le champ title (titre) est obligatoire")
    .isString()
    .withMessage("Le title doit être une chaîne de caractères"),
  body("target")
    .notEmpty()
    .withMessage("Le champ target (objectif) est obligatoire")
    .isInt({ min: 1 })
    .withMessage("Le target doit être un nombre entier positif"),
  body("deadline")
    .optional()
    .isISO8601()
    .withMessage(
      "La date limite (deadline) doit être au format valide (YYYY-MM-DD)",
    ),
  body("languageId")
    .optional()
    .isUUID()
    .withMessage("L'ID de la langue doit être un UUID valide"),
];

module.exports = {
  validateGoal,
};
