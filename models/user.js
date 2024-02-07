const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
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
  },
  { tableName: "user", timestamps: false }
);

// Avant de créer un utilisateur, on hash son mot de passe
User.beforeCreate(async (user) => {
  // le nombre 10 est le nombre de tour de hashage
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// Un utilisateur peut publier autant d'hébergement qu'il souhaite

module.exports = User;
