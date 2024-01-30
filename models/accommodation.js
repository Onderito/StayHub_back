const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Accommodation = sequelize.define("Accommodation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Assurez-vous que le modèle User est correctement importé
      key: "id",
    },
  },
});

module.exports = Accommodation;
