// As early as possible in your application, import and configure dotenv:
require("dotenv").config();
console.log(process.env); // remove this after you've confirmed it is working

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const webpush = require("web-push");

// init express
const app = express();

// VAPID keys should be generated only once. This gets our keys from .env. They are used to identify who is sending the push notifications
const publicVapidKey = process.env.publicVapidKey;
const privateVapidKey = process.env.privateVapidKey;
const email = process.env.email;

// When making requests where you want to define VAPID details, call this method before sendNotification() or pass in the details and options to sendNotification.
webpush.setVapidDetails(email, publicVapidKey, privateVapidKey);
