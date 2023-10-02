const orderouter = require("express").Router();
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const ratelimit = require("express-rate-limit");
const { receiveOrder, getAllOrders, changeOrderStatus, getAllUserOrders } = require("../../controllers/admin_controllers/ordercontroller");
const { isAdmin } = require("../../controllers/user_controllers/authcontroller");

orderouter.post("/received-order",receiveOrder);
//admin can see all the orders 
orderouter.get("/admin/orders/get-all-orders",isAdmin,getAllOrders);
//user can see all the orders placed by him/her
orderouter.get("/orders/get-all-user-orders",getAllUserOrders);
orderouter.post("/admin/orders/change-order-status",isAdmin,changeOrderStatus);

module.exports = orderouter;