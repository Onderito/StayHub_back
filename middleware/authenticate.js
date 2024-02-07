const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = (req, res, next) => {
  // On récupère le token dans le header de la requête
  const fetchBearer = req.header("Authorization");
  // On extrait le token du header en retirant "Bearer "
  const extractToken = fetchBearer && fetchBearer.split(" ")[1];

  // Si le token est vide ou invalide, on renvoie une erreur
  if (extractToken == null)
    return res
      .status(401)
      .json({ code: 401, message: "Empty or invalid token" });

  // On vérifie que le token est valide
  jwt.verify(
    extractToken,
    // On utilise la clé secrète
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        // Si le token est invalide, on renvoie une erreur
        return res.status(401).json({ code: 401, message: err.message });
      }
      // sinon on stocke l'utilisateur dans la requête
      req.user = await User.findByPk(decodedToken.userId);

      next();
    }
  );
};
module.exports = authenticate;
