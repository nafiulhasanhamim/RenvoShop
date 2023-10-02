require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ratelimit = require("express-rate-limit");
const xssClean = require('xss-clean');
const userrouter = require("./routes/user_routes/auth");
const productrouter = require("./routes/admin_routes/productroute");
const categorierouter = require("./routes/admin_routes/categorieroute");
const orderouter = require("./routes/admin_routes/orderroute");
const usercontrolrouter = require("./routes/admin_routes/usercontrolroute");

//const userrouter = require("./routes/user.auth");
const app = express();
const ratelimiter = ratelimit({
  windowMs : 1*60*1000,
  max : 5,
  message : 'Too many request..Please try again later'
});


app.use(xssClean())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(ratelimiter);


// home route
app.get("/", (req, res) => {
  res.send("<h1> Welcome to the server </h1>");
});

app.use("/",userrouter);
//app.use("/",ratelimiter,userrouter);
app.use("/",productrouter);
app.use("/",categorierouter);
app.use("/",orderouter);
app.use("/",usercontrolrouter);

//resource not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});



//server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;