const Car = require("../models/Car");

const createCar = async (req, res) => {
  const { userId, car_license, plate_number } = req.body;
  const car = await Car.findOne({
    where: {
      userId,
    },
  });
  try {
    if (!car) {
      const car = await Car.create({ userId, car_license, plate_number });
      res.status(201).send(car);
    } else {
      res.status(401).send("Car doesn't created");
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

const getCar = async (req, res) => {
  try {
    const car = await Car.findOne({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).send(car);
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.destroy({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

const updateCar = async (req, res) => {
  const { car_license, plate_number } = req.body;
  try {
    const car = await Car.update(
      { car_license, plate_number },
      {
        where: {
          userId: req.params.id,
        },
      }
    );
    res.status(200).send(car);
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = {
  createCar,
  getCar,
  deleteCar,
  updateCar,
};
