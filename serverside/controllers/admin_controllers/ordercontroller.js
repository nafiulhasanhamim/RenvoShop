require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pool = require("../../config/db");
const {v4 : uuidv4} = require("uuid");
const format = require('pg-format');
const moment = require('moment');


//received order (when user place a order this controller placed that order)
const receiveOrder = async (req,res) => {
    const {user_id,payment_method,transaction_id,full_address,payment_number,contact_number } = req.body.orderData;
    const {products} = req.body;
    const order_id = uuidv4();
   
       try {
         const currentDate = moment().format('YYYY-MM-DD');
         console.log(currentDate);
        const result1 = await pool.query("INSERT into orders (order_id,user_id,status,payment_method,transaction_id,full_address,payment_number,contact_number,order_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [order_id,user_id,"Pending",payment_method,transaction_id,full_address,payment_number,contact_number,currentDate])
        
        for (const product of products) {
          pool.query(`
            INSERT INTO ordered_product (product_id,quantity,price,order_id)
            VALUES ($1, $2,$3,$4)`, [product.product_id,product.quantity,product.price*product.quantity,order_id])
            const getCurrentQuantityQuery = 'SELECT available_product FROM products WHERE product_id = $1';
        const { rows } = await pool.query(getCurrentQuantityQuery, [product.product_id]);
        const currentQuantity = rows[0].available_product;

            pool.query(`UPDATE products SET available_product=$1 WHERE product_id=$2`,[currentQuantity-product.quantity,product.product_id])

        }
        return res.send({
             success: true,
             message: "Order is placed successfully..",
        })
        
       } catch (error) {
        return res.send({
          success: false,
          message: "Order is not placed successfully..Something went wrong!!",
          error: error,
        });
        
       }
 }


//  //getAllOrders (admin can see all the orders)
//  const getAllOrders = async (req,res) => {
//   const allOrders = await pool.query("select o.order_id,o.user_id,op.product_id,o.status,o.payment_method,o.transaction_id,o.full_address,o.payment_number,o.contact_number,o.order_date as order_date,op.quantity,op.price,p.product_name,p.product_image from orders as o join ordered_product as op on o.order_id = op.order_id join products as p on op.product_id = p.product_id join users as u  on o.user_id = u.user_id order by o.order_id")
//   .then((order)=> {
//       res.send({
//           success: true,
//           message: "Successfully fetched all orders",
//           orders : order.rows
//         });
//   })
//   .catch((error) => {
//       res.send({
//         success: false,
//         message: "Something went wrong!!",
//         error: error,
//       });
//     });
// }


//getAllOrders (admin can see all the orders)
const getAllOrders = async (req,res) => {
  const {status} = req.query;
  let query = `select o.order_id,o.user_id,op.product_id,o.status,
  o.payment_method,o.transaction_id,o.full_address,o.payment_number,
  o.contact_number,o.order_date as order_date,op.quantity,op.price,
  p.product_name,p.product_image from orders as o join ordered_product as op
   on o.order_id = op.order_id join products as p on op.product_id = p.product_id join users as u 
    on o.user_id = u.user_id`
    
const conditions = [];
const values = [];
if(status?.length>0 && status!=="All") {
  conditions.push(`o.status = $${values.length + 1}`);
  values.push(status);
}
if (conditions.length > 0) {
  const whereClause = conditions.join(' AND ');
    query += ` WHERE ${whereClause} ORDER BY o.order_date DESC`; 
} if(conditions.length===0) {
    query += ` ORDER BY o.order_date DESC`; 
}

const get_all_order = await pool.query(query,values)
.then((order)=> {
  res.send({
      success: true,
      message: "Successfully fetched all orders",
      orders : order.rows
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

//getAllOrders (user can see all the orders placed by him/her)
const getAllUserOrders = async (req,res) => {
  const allOrders = await pool.query(`select o.order_id,o.user_id,op.product_id,o.status,o.payment_method,
  o.transaction_id,o.full_address,o.payment_number,o.contact_number,o.order_date as order_date,
  op.quantity,op.price,p.product_name,p.product_image from orders as o
  join ordered_product as op on o.order_id = op.order_id 
  join products as p on op.product_id = p.product_id 
  join users as u  on o.user_id = u.user_id where u.user_id = $1
  order by o.order_date DESC
  `,[req.query.user_id])
  .then((order)=> {
      res.send({
          success: true,
          message: "Successfully fetched all orders",
          orders : order.rows
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

//change order status
const changeOrderStatus = async (req,res) => {
  const {order_id,status} = req.body;
  const updateStatus = await pool.query(`UPDATE orders SET status=$1 WHERE order_id=$2`,[status,order_id])
  .then((update)=> {
      res.send({
          success: true,
          message: "Successfully Updated order status",
          orders : update.rows
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
//getAllPendingOrders

//getAllDeliveredOrder

//getAllOrdersOfaParticularUsers

module.exports = {receiveOrder , getAllOrders , changeOrderStatus,getAllUserOrders}