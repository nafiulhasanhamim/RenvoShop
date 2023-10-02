require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pool = require("../../config/db");
const {v4 : uuidv4} = require("uuid");



//add categorie
const addCategorie = async (req,res) => {
    const {categorie_name} = req.body;
    const categorie_id = uuidv4();
    const create_categorie = await pool.query("INSERT into categories (categorie_id,categorie_name) VALUES ($1,$2)",
    [categorie_id,categorie_name])
    .then((categorie)=> {
        res.send({
            success: true,
            message: "Categorie is created Successfully",
          });
    })
    .catch((error) => {
        res.send({
          success: false,
          message: "Categorie is not created..Something went wrong!!",
          error: error,
        });
      });
}


//get All categories
const getAllCategories = async (req,res) => {
    const categories = await pool.query("SELECT * FROM categories")
    .then((data)=> {
        res.send({
            success : true,
            categories : data.rows
        })
    })
    .catch((error) => {
        res.send({
          success: false,
          message: "Something Went Wrong",
          error: error,
        });
      });
    
}


module.exports = {addCategorie,getAllCategories}