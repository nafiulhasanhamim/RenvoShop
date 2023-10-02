require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pool = require("../../config/db");
const {v4 : uuidv4} = require("uuid");
const format = require('pg-format');
const moment = require('moment');

const accountSid = "AC0609ae94585cf7bd335ad27e0a3049a7";
const authToken = "8bb6e1924cb7b25ff7f6be9d4d3a51c0";
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({body: 'Hi there', from: '+15017122661', to: '+15558675310'})
      .then(message => console.log(message.sid));
