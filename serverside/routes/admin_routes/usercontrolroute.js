const usercontrolrouter = require("express").Router();
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { isAdmin, validateAdminPassword } = require("../../controllers/user_controllers/authcontroller");
const { getAllUsers, resetPassword } = require("../../controllers/admin_controllers/usercontroller");
usercontrolrouter.use(passport.initialize());



//getAllUsers
usercontrolrouter.get("/admin/users/get-all-users",isAdmin,getAllUsers);
usercontrolrouter.post("/admin/users/reset-password",isAdmin,validateAdminPassword,resetPassword);

module.exports = usercontrolrouter;
