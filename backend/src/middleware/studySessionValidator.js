const { body } = require("express-validator");

const validateStudySession = [
  body("duration")
    .notEmpty()
    .withMessage("Le champ duration (durée) est obligatoire")
    .isInt({ min: 1 })
    .withMessage("La durée doit être un nombre entier positif (en minutes)"),
  body("languageId")
    .notEmpty()
    .withMessage("Le champ languageId est obligatoire")
    .isUUID()
    .withMessage("L'ID de la langue doit être un UUID valide"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage(
      "La date de la session doit être au format valide (YYYY-MM-DD)",
    ),
];

module.exports = {
  validateStudySession,
};
