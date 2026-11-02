const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("--> Token reçu dans middleware:", token);

      const decoded = jwt.verify(token, "lingorise_secret_key_2026");
      req.user = decoded;
      return next();
    } catch (error) {
      // ON AFFICHE L'ERREUR EXACTE ICI
      console.error("ERREUR JWT EXACTE:", error.message);
      return res.status(401).json({
        success: false,
        message: `Token failed: ${error.message}`, // On renvoie l'erreur dans Postman pour voir clair
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: "Not authorized, no token provided.",
  });
};

module.exports = { protect };
