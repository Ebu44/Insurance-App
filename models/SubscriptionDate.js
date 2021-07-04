const { DataTypes } = require("sequelize");
const db = require("../database/DatabaseConnection");
const Subscription = require("./Subscription");

const SubscriptionDate = db.define("subscription_date", {
  price: {
    type: DataTypes.DECIMAL,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["Pending", "Activate", "Expired", "Cancelled"],
  },
  paymentType: {
    type: DataTypes.ENUM,
    values: ["Card", "Promotion-Code"],
  },
  startDate: {
    type: DataTypes.DATEONLY,
  },
  endDate: {
    type: DataTypes.DATEONLY,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

SubscriptionDate.belongsTo(Subscription);

SubscriptionDate.sync().then(() => {
  console.log("SubscriptionDate table created");
});

module.exports = SubscriptionDate;
