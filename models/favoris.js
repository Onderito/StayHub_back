const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Accommodation = require("./accommodation");

const Favoris = sequelize.define("Favoris", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

// favoris appartient à un user spécifique, un user peut avoir plusieurs favoris
Favoris.belongsTo(User, { foreignKey: "user_id", as: "user" });

// favoris appartient à un hébergement spécifique, un hébergement peut avoir plusieurs favoris.
Favoris.belongsTo(Accommodation, {
  foreignKey: "accommodation_id",
  as: "accommodation",
});

module.exports = Favoris;
