const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const SECRETKEY =
  "sk_test_51HUvyEFW83lgVIEd6r40qJtnqQ3edJJTBDShENL8hgHcIoT2LDK18sadAE3dC1X2weI42HOAn8oTRHL9owv8qhpL006KxDPJnP";
const stripe = require("stripe")(SECRETKEY);

// API

// -App Config
const app = express();

// -Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// -API Routes
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello world",
  });
});
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // in subunits total
    currency: "inr",
    payment_method_types: ["card"],
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// -Listen Command
exports.api = functions.https.onRequest(app);
