const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Accommodation = require("./accommodation");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  password: {
    type: DataTypes.TEXT,
  },
});

// Un utilisateur peut publier autant d'hébergement qu'il souhaite
User.hasMany(Accommodation, { foreignKey: "user_id", as: "accommodations" });

module.exports = User;
