const express = require("express");
const { register, login, logout } = require("../controllers/AuthController");
const {
  createCar,
  getCar,
  deleteCar,
  updateCar,
} = require("../controllers/CarController");
const {
  createSubscription,
  getSubscriptions,
} = require("../controllers/Subscription");
const router = express.Router();

//Auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//Car
router.post("/api/car", createCar);
router.get("/api/car", getCar);
router.put("/api/car/:id", updateCar);
router.delete("/api/car/:id", deleteCar);

//Subscription
router.post("/api/subscription", createSubscription);
router.get("/api/subscription/:carId", getSubscriptions);

module.exports = router;
