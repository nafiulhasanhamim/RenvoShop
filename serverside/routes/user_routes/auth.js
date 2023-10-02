const userrouter = require("express").Router();
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const ratelimit = require("express-rate-limit");

const { registerUser, loginUser, verifyToken, profileController, verifyTokenfrontend, completeRegistration, verifyEmailForRegistration, sendMailForRecoverPassword, verifyOTP, updatedPassword} = require("../../controllers/user_controllers/authcontroller");


const ratelimiter = ratelimit({
    windowMs : 1*60*1000,
    max : 5,
    message : 'Too many request..Please try again later'
  });

  
userrouter.use(passport.initialize());
// register route
userrouter.post("/register", ratelimiter,registerUser);
userrouter.get("/registration/activate-account/:token", verifyEmailForRegistration,completeRegistration);

// login route
userrouter.post("/login",ratelimiter,loginUser);

//forget-password sending mail 
userrouter.post("/send-mail-to-recover-password",ratelimiter,sendMailForRecoverPassword);
//verify OTP
userrouter.post("/verify-OTP",ratelimiter,verifyOTP);
//updated password 
userrouter.post("/updated-password",ratelimiter,updatedPassword);


// profile route
userrouter.get("/profile",verifyToken,profileController);

//token verification from frontend
userrouter.get("/verifytoken", verifyTokenfrontend);

module.exports = userrouter;