
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// const cryptoRandomString = require("crypto-random-string");
const pool = require("../../config/db");
const {v4 : uuidv4} = require("uuid");
const { createToken } = require("../../helpers/jsonwebtoken");
const emailWithNodeMailer = require("../../helpers/email");

const saltRounds = 10;

const registerUser = async (req,res) => {
    try {

        const {name,email,password,address,access} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        if (user.rowCount===1) {
          return res.status(400).send({
            message : "This Email or Phone Number Already Used"
          });
        }
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
          
           const user_id = uuidv4();
           let role;
           if(access) {
              role = access
           } else {
            role = "user";
           }

           //For sending verification email
           const payload = {
            user_id,
            name,
            email,
            hash,
            address,
            role
          };
        
           const token = createToken(payload,"20m");
        
          //prepare email
          const emailData = {
            email,
            subject : 'Acount Activation Email',
            html : `
            <h2>Hello, ${name}! </h2>
            <p> Please click here to activate your account <a href="http://localhost:3000/registration/activate-account/${token}" target="_blank">Activate Your Account </a></p>
            ` 
          }

         try {
          await emailWithNodeMailer(emailData)
          return res.send({
            success: true,
            message : `Please go to your ${email} for completing your registration process`
          });
         } catch (emailError) {
            //  next(createError(500,'Failed to send verification email'));
             return ;          
         }

          //for sending an OTP 
          //  const accountSid = "AC0609ae94585cf7bd335ad27e0a3049a7";
          //  const authToken = "8bb6e1924cb7b25ff7f6be9d4d3a51c0";
          //  const client = require('twilio')(accountSid, authToken);

          //  client.messages
          //  .create({body: 'OTP - 47689', from: '+14027714919', to: '+8801944700614'})
          //  .then(message => console.log(message.sid));

          // const create_user = await pool.query("INSERT into users (user_id,name,email,password,address,access) VALUES ($1,$2,$3,$4,$5,$6)",
          // [user_id,name,email,hash,address,role])
          //   .then((user) => {
          //     res.send({
          //       success: true,
          //       message: "User is created Successfully",
          //       user : {
          //         user_id,
          //         email
          //       }
          //     });
          //   })
          //   .catch((error) => {
          //     res.send({
          //       success: false,
          //       message: "User is not created",
          //       error: error,
          //     });
          //   });
         });


      } catch (error) {
        res.status(500).send(error.message);
      }
}


const completeRegistration = async (req,res) => {
  const {user_id,name,email,hash,address,role} = req.token;
  const create_user = await pool.query("INSERT into users (user_id,name,email,password,address,access) VALUES ($1,$2,$3,$4,$5,$6)",
          [user_id,name,email,hash,address,role])
            .then((user) => {
              res.send(`<h1>Your Email has been verified Successfully...
                 Please , <a href="http://127.0.0.1:5173/login" target="_blank">Login here </a>
              </h1>`);
            })
            .catch((error) => {
              res.send({
                success: false,
                message: "User is not created",
              });
            });
}

//send Mail For Recover Password
const sendMailForRecoverPassword = async (req,res) => {
  const {email} = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        if (user.rowCount===0) {
          return res.status(200).send({
            message : "This account doesnot exist"
          });
        }
  const otp_id = uuidv4();
  const otp = Math.floor(10000 + Math.random() * 90000);
  //prepare email
  const emailData = {
    email,
    subject : 'Recover Password Email',
    html : `
    <p> Your one-time OTP For Recovering password is ${otp}</p>
    ` 
  }

 try {
  await emailWithNodeMailer(emailData)
  /*check if an OTP already exist or not..
  because of it may happens otp sent to user mail address but they didn't use it further..Again they 
  may try to recover their password and it creates a problem
  */
 
  const otp_check = await pool.query("SELECT * FROM otp_data WHERE email=$1 AND usedfor=$2",[email,"recover_password"]);
        
        if (otp_check.rowCount===0) {
          const otp_insert = await pool.query("INSERT INTO otp_data (otp_id,email,usedfor,otp) VALUES ($1,$2,$3,$4)",[otp_id,email,"recover_password",otp])
          .then((result)=> {
          return res.send({
          success: true,
          message : `An OTP is sent to your email address`
    });
  })
  
 } else {
  const otp_update = await pool.query("UPDATE otp_data SET otp=$1 WHERE email=$2",[otp,email])
  .then((result)=> {
    return res.send({
    success: true,
    message : `An OTP is sent to your email address`
});
})

 }
  
 } catch (emailError) {
    //  next(createError(500,'Failed to send verification email'));
     return ;          
 }
}

//verify OTP controller
const verifyOTP = async (req,res) => {
  const {email,usedfor} = req.body;
  const OTP =  Number(req.body.OTP);
  const otp_verify = await pool.query("SELECT * FROM otp_data WHERE email=$1 AND usedfor=$2 AND otp=$3",[email,usedfor,OTP]);
  if(otp_verify.rowCount===1) {
    const otp_delete = await pool.query("DELETE FROM otp_data WHERE email=$1 AND usedfor=$2 AND otp=$3",[email,usedfor,OTP])
    .then((data)=> {
      return res.status(201).send({
        success: true,
        message: "OTP is successfully verified",
      });
    })
  }
  if (otp_verify.rowCount===0) {
    return res.status(201).send({
      success: false,
      message: "OTP is not matched",
    });
  } 

}

//updated password controller
const updatedPassword = async (req,res) => {
  const {email,newPassword} = req.body;
   try {
    bcrypt.hash(newPassword, saltRounds, async (err, hash) => {

      const resetPassword = await pool.query(`UPDATE users SET password=$1 WHERE email=$2`,
      [hash,email])
        .then((user) => {
          res.send({
            success: true,
            message: "Password is recovered Successfully",
          });
        })
        .catch((error) => {
            res.send({
              success: false,
              message: "Password is not recovered...",
              error: error,
            });
          });
       });


    } catch (error) {
      res.status(500).send(error.message);
    }

}

const verifyEmailForRegistration = async (req,res,next) => {
  let token = req.params.token;
  if(token) {
    token = token.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,valid)=> {
      if(err) {
        res.send({result : "please provide valid token"});
      } else {
        try {
          let decode;
          decode = jwt.decode(token);
          const {user_id,name,email,hash,address,role} = decode;
          req.token = decode;
          next();
          
        } catch (error) {
          console.log(error)
        }
      }
    })

  } else {
    res.send({result : "please add token with header"});
  }
}


const loginUser = async (req,res) => {
  const {email,password} = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
  if (user.rowCount===0) {
    return res.status(201).send({
      success: false,
      message: "User is not found",
    });
  }

  if (!bcrypt.compareSync(password, user.rows[0].password)) {
    return res.status(201).send({
      success: false,
      message: "Incorrect password",
    });
  }

  const payload = {
    id: user.rows[0].user_id,
    name: user.rows[0].name,
    role : user.rows[0].access
  };

  let token;
  if(user.rows[0].access==="admin") {
    token = createToken(payload,"1h");

  } else { 
   token = createToken(payload,"2d");
  }


  return res.status(200).send({
    success: true,
    userinfo:{
      name:user.rows[0].name,
      user_id:user.rows[0].user_id,
      access : user.rows[0].access
    },
    message: "User is logged in successfully",
    token: token,
  });

}

const profileController = (req,res) => {
    res.status(200).send({
      message: "profile controller",
      id:req.info
    })
}

//middleware
const verifyToken = (req,resp,next) => {

  let token = req.headers['authorization'];
  if(token) {
    token = token.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,valid)=> {
      if(err) {
        resp.send({result : "please provide valid token"});
      } else {
          let decode;
          decode = jwt.decode(token);
          req.info = decode;    
          //  resp.send({
          //   result : "token is verified",
          //   id:decode.id
          // })
            next();
      }
    })

  } else {
    resp.send({result : "please add token with header"});
  }
}


//check admin middleware
const isAdmin = (req,resp,next) => {

  let token = req.headers['authorization'];
  if(token) {
    token = token.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,valid)=> {
      if(err) {
        resp.send({result : "please provide valid token"});
      } else {
          let decode;
          decode = jwt.decode(token);
          req.info = decode;    
           if(decode.role==='admin') { 
              next();
           } else {
                resp.send({
                  message : "admin not verified"
                })
           }
      }
    })

  } else {
    resp.send({result : "please add token with header"});
  }
}

//validate admin password
const validateAdminPassword = async (req,res,next) => {
    try {
     const {id,name,role} = req.info;
     const {password} = req.body;
     const admin = await pool.query("SELECT * FROM users WHERE user_id=$1",[id]);
  if (admin.rowCount===0) {
    return res.status(201).send({
      success: false,
      message: "Admin is not found",
    });
  }

  if (!bcrypt.compareSync(password, admin.rows[0].password)) {
    return res.status(201).send({
      success: false,
      message: "Incorrect password",
    });
  }
  next();
    } catch (error) {
      res.send({
        success: false,
        message: "Something Went Wrong on Server...",
        error: error,
      });
    }
}

//token verification from frontend side
const verifyTokenfrontend = (req,resp) => {
  let token = req.headers['authorization'];
  if(token) {
    token = token.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,valid)=> {
      if(err) {
        resp.send({result : "please provide valid token"});
      } else {
          let decode;
          decode = jwt.decode(token);
          req.info = decode;    
           resp.send({
            result : "token is verified",
            id:decode.id,
            role : decode.role
          })
            
      }
    })

  } else {
    resp.send({result : "please add token with header"});
  }
}

module.exports = {registerUser,loginUser,isAdmin,verifyToken,profileController,verifyTokenfrontend,validateAdminPassword,verifyEmailForRegistration,completeRegistration,sendMailForRecoverPassword,verifyOTP , updatedPassword}