const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("stayhub", "onderito", "ulasonder", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
