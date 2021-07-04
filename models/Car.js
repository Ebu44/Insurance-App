const { DataTypes } = require("sequelize");
const User = require("../models/User");
const db = require("../database/DatabaseConnection");

const Car = db.define("car", {
  car_license: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plate_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});

Car.belongsTo(User);

Car.sync().then(() => {
  console.log("Car table created");
});

module.exports = Car;
