require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pool = require("../../config/db");
const {v4 : uuidv4} = require("uuid");

const saltRounds = 10;

//getAllUsers
const getAllUsers = async (req,res) => {
    const allUsers = await pool.query("select user_id,name,email,address from users where access=$1",["user"])
    .then((user)=> {
        res.send({
            success: true,
            message: "Successfully fetched all Users",
            users : user.rows
          });
    })
    .catch((error) => {
        res.send({
          success: false,
          message: "Something went wrong!!",
          error: error,
        });
      });
}

//If user forget his/her password then admin can reset his/her password
const resetPassword = async (req,res) => {
    try {
       
        const {user_id} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_id=$1",[user_id]);
        if (user.rowCount===0) {
          return res.status(400).send({
            message : "This Email Doesn't Exist"
          });
        }
        
        bcrypt.hash(process.env.RESET_DEFAULT_PASS, saltRounds, async (err, hash) => {

          const resetPassword = await pool.query(`UPDATE users SET password=$1 WHERE user_id=$2`,
          [hash,user_id])
            .then((user) => {
              res.send({
                success: true,
                message: "Password is reset Successfully",
              });
            })
            .catch((error) => {
                res.send({
                  success: false,
                  message: "Password is not reset",
                  error: error,
                });
              });
           });
  
  
        } catch (error) {
          res.status(500).send(error.message);
        }
}





module.exports = {getAllUsers,resetPassword}