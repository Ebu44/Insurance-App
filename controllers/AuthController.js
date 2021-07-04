const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/env/config");

const register = async (req, res) => {
  const { first_name, last_name, email, password, slug } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  try {
    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      const data = await User.create({
        first_name,
        last_name,
        email,
        password: hash,
        slug,
      });
      res.status(200).send(data);
    } else {
      res.send("User already registered");
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).send("User can't found");
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        res.send({ status: false, message: "Wrong password" });
      } else {
        const payload = {
          email,
        };
        const token = await jwt.sign(payload, JWT_SECRET_KEY, {
          expiresIn: 720,
        });
        res.send({ status: true, token: token });
      }
    }
  } catch (err) {
    res.send(err);
  }
};

const logout = async (req, res) => {
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successful",
    });
};

module.exports = {
  register,
  login,
  logout,
};
