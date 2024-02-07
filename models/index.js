const Accommodation = require("./accommodation");
const Favori = require("./favori");
const User = require("./user");
const Reservation = require("./reservation");

// un utilisateur peut publier autant d'hébergement qu'il souhaite
User.hasMany(Accommodation, { foreignKey: "user_id", as: "accommodations" });
// un utilisateur peut réserver autant d'hébergement qu'il souhaite
User.belongsToMany(Accommodation, {
  through: Reservation,
  foreignKey: "user_id",
  as: "reservations",
});
// un hébergement appartient à un seul utilisateur
Accommodation.belongsTo(User, { foreignKey: "user_id", as: "user" });

// un hébergement peut être réservé par plusieurs utilisateurs
Accommodation.belongsToMany(User, {
  through: Reservation,
  foreignKey: "accommodation_id",
  as: "reservations",
});

// un utilisateur peut avoir plusieurs hébergements en favoris
User.belongsToMany(Accommodation, {
  through: Favori,
  foreignKey: "user_id",
  as: "favoris",
});

// un hébergement peut être mis en favoris par plusieurs utilisateurs
Accommodation.belongsToMany(User, {
  through: Favori,
  foreignKey: "accommodation_id",
  as: "favoris",
});

module.exports = {
  Accommodation,
  Favori,
  User,
  Reservation,
};
