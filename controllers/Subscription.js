const { STRIP_SECRET_KEY } = require("../config/env/config");
const stripe = require("stripe")(STRIP_SECRET_KEY);
const Subscription = require("../models/Subscription");
const SubscriptionDate = require("../models/SubscriptionDate");

const createSubscription = async (req, res) => {
  const { carId, stripeToken, subscriptionType } = req.body;
  let price = 0;
  let description = "";
  if (carId) {
    switch (subscriptionType) {
      case "Coper":
        price = 50;
        description = "Coper Subscription Type";
        break;
      case "Silver":
        price = 100;
        description = "Silver Subscription Type";
        break;
      case "Gold":
        price = 150;
        description = "Gold Subscription Type";
        break;
    }

    let amount = price * 100;

    const subscription = await Subscription.findOne({ where: { carId } });

    // if (!subscription) {
    //   await stripe.charges
    //     .create({
    //       amount,
    //       currency: "usd",
    //       source: stripeToken,
    //       description,
    //     })
    //     .then(async () => {
    //       await Subscription.create({
    //         carId,
    //         subscriptionType,
    //       })
    //         .then(async (subscription) => {
    //           await SubscriptionDate.create({
    //             subscriptionId: subscription.id,
    //             price,
    //             status: "Activate",
    //             paymentType: "Card",
    //             startDate: Date.now(),
    //             endDate: Date.now(),
    //           })
    //             .then((subscriptionDate) => {
    //               res.send(subscriptionDate);
    //             })
    //             .catch((err) => {
    //               res.send(err);
    //             });
    //         })
    //         .catch((err) => {
    //           res.status(400).send(err);
    //         });
    //     })
    //     .catch((err) => {
    //       res.status(403).send(err);
    //     });
    // } else {
    //   res.status(401).send("You already have a subscription");
    // }

    if (!subscription) {
      try {
        await stripe.charges.create({
          amount,
          currency: "usd",
          source: stripeToken,
          description,
        });
        const userSubscription = await Subscription.create({
          carId,
          subscriptionType,
        });
        const userSubscriptionDate = await SubscriptionDate.create({
          subscriptionId: userSubscription.id,
          price,
          status: "Activate",
          paymentType: "Card",
          startDate: Date.now(),
          endDate: Date.now(),
        });
        res.status(201).send(userSubscriptionDate);
      } catch (err) {
        res.status(401).send(err);
      }
    } else {
      res.status(401).send("You already have a subscription");
    }
  } else {
    res.send("Must have a car");
  }
};

const getSubscriptions = (req, res) => {
  Subscription.findOne({
    where: {
      carId: req.params.carId,
    },
  })
    .then((subscriptions) => {
      SubscriptionDate.findAll({
        where: {
          subscriptionId: subscriptions.id,
        },
      }).then((subscriptionDate) => {
        res.status(200).send(subscriptionDate);
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  createSubscription,
  getSubscriptions,
};
