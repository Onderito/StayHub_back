const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Accommodation = require("./accommodation");

const Reservation = sequelize.define("Reservation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  departure_date: {
    type: DataTypes.DATE,
  },
  arrival_date: {
    type: DataTypes.DATE,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  accommodation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Accommodation,
      key: "id",
    },
  },
});

// Une réservation appartient à un utilisateur.
Reservation.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Une réservation appartient à un seul hébergement spécifique.
Reservation.belongsTo(Accommodation, {
  foreignKey: "accommodation_id",
  as: "accommodation",
});

module.exports = Reservation;
