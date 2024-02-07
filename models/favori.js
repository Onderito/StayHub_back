const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Favori = sequelize.define(
  "Favori",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    accommodation_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "favori", timestamps: false }
);

module.exports = Favori;
