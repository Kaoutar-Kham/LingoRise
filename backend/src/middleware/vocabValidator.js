const { body } = require("express-validator");

const validateVocab = [
  body("word").trim().notEmpty().withMessage("Le mot est obligatoire"),
  body("translation")
    .trim()
    .notEmpty()
    .withMessage("La traduction est obligatoire"),
  body("languageId")
    .notEmpty()
    .withMessage("L'identifiant de la langue est obligatoire")
    .isInt()
    .withMessage("L'identifiant de la langue doit être un nombre entier"),
];

module.exports = { validateVocab };
