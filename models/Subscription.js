const { DataTypes } = require("sequelize");
const db = require("../database/DatabaseConnection");
const Car = require("./Car");

const Subscription = db.define("subscription", {
  subscriptionType: {
    type: DataTypes.ENUM,
    values: ["Coper", "Silver", "Gold"],
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});

Subscription.belongsTo(Car);

Subscription.sync().then(() => {
  console.log("Subscription table created");
});

module.exports = Subscription;
