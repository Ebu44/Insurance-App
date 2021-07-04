const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/env/config");

module.exports = (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.body.token || req.query.token;

  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          message: "Failed to authenticate token",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({ status: false, message: "No token provided" });
  }
};
