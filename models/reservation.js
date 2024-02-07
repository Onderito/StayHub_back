const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reservation = sequelize.define(
  "Reservation",
  {
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
    },
    accommodation_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "reservation", timestamps: false }
);

module.exports = Reservation;
