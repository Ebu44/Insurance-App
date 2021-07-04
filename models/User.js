const db = require("../database/DatabaseConnection");
const { Sequelize, DataTypes } = require("sequelize");

const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: {
        msg: "Please provide an email!",
      },
    },
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
    validate: {
      notNull: {
        msg: "Please provide an email!",
      },
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
    validate: {
      notNull: {
        msg: "Please provide an email!",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 6,
    },
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_staff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

User.sync().then(() => {
  console.log("User table created");
});

module.exports = User;
