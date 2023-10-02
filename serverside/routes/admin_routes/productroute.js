const productrouter = require("express").Router();
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { addProduct, getAllProducts, getProductById, soldAllProducts, getAllProduct, updatedAllProducts} = require("../../controllers/admin_controllers/productcontroller");
const { isAdmin } = require("../../controllers/user_controllers/authcontroller");
productrouter.use(passport.initialize());


// add product 
productrouter.post("/admin/product/add-product",isAdmin,addProduct);
// get all products
productrouter.get("/product/get-all-products",getAllProducts);
productrouter.get("/product/get-all-product",getAllProduct);
productrouter.get("/admin/product/sold-all-products",isAdmin,soldAllProducts);
productrouter.get("/product/get-product/:id",getProductById);
productrouter.get("/product/update-all-product",updatedAllProducts);



module.exports = productrouter;