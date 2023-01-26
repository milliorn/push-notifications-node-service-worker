// As early as possible in your application, import and configure dotenv:
require("dotenv").config();
// console.log(process.env); // remove this after you've confirmed it is working

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const webpush = require("web-push");

// init express
const app = express();
const port = process.env.PORT || 5000;

// set static frontend
app.use(express.static(path.join(__dirname, "frontend")));

// init body parser
app.use(bodyParser.json());

// VAPID keys should be generated only once. This gets our keys from .env. They are used to identify who is sending the push notifications
const publicVapidKey = process.env.publicVapidKey;
const privateVapidKey = process.env.privateVapidKey;
const email = process.env.email;

// When making requests where you want to define VAPID details, call this method before sendNotification() or pass in the details and options to sendNotification.
webpush.setVapidDetails(email, publicVapidKey, privateVapidKey);

// subscribe to routes
app.post("/subscribe", (req, res) => {
  // Get push subscription object
  const subscription = req.body;

  // Send 201 - created resource
  res.status(201).json({});

  // Create the payload
  const payload = JSON.stringify({ title: "Push Notification Test" });

  // Pass object into send notification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
