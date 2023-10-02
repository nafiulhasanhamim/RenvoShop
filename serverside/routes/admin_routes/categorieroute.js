const categorierouter = require("express").Router();
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { isAdmin } = require("../../controllers/user_controllers/authcontroller");
const { addCategorie, getAllCategories } = require("../../controllers/admin_controllers/categoriecontroller");
categorierouter.use(passport.initialize());



//add categorie
categorierouter.post("/admin/categorie/add-categorie",isAdmin,addCategorie);
//get All Categories
categorierouter.get("/categorie/get-all-categories",getAllCategories);


module.exports = categorierouter;
