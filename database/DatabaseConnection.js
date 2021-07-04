const { DATABASE_URL } = require("../config/env/config");
const { Sequelize } = require("sequelize");

module.exports = new Sequelize(DATABASE_URL);
