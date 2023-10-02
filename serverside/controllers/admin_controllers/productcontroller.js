require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pool = require("../../config/db");
const {v4 : uuidv4} = require("uuid");


//add product 
const addProduct = async (req,res) => {
    const {product_name,categorie_id,product_description,price,available_product,discount,product_image} = req.body;
    const product_id = uuidv4();
    const discounted_price = price - Math.floor((price*discount)/100);
    const create_product = await pool.query("INSERT into products (product_id,categorie_id,product_name,product_description,price,available_product,discount,product_image,discounted_price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [product_id,categorie_id,product_name,product_description,price,available_product,discount,product_image,discounted_price])
    .then((product)=> {
        res.send({
            success: true,
            message: "Product is created Successfully",
          });
    })
    .catch((error) => {
        res.send({
          success: false,
          message: "Product is not created..Something went wrong!!",
          error: error,
        });
      });
}


//get all products 
const getAllProducts = async (req,res) => {
    const get_all_product = await pool.query("select p.product_id,p.categorie_id,p.product_name, p.product_description,p.price,p.available_product,p.discount,p.product_image,c.categorie_name from products as p inner join categories as c on p.categorie_id = c.categorie_id")
    .then((product)=> {
        res.send({
            success: true,
            message: "Successfully fetched all products",
            products : product.rows
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

const getAllProduct = async (req,res) => {
  const {categorie,page,checkboxes,priceFrom,priceTo,sortBy,searchBarValue} = req.query;
  let query = `SELECT
  p.product_id,
  p.categorie_id,
  p.product_name,
  p.product_description,
  p.price,
  p.available_product,
  p.discount,
  p.product_image,
  p.discounted_price,
  c.categorie_name,
  COUNT(*) OVER () AS total_rows
FROM
  products AS p
  INNER JOIN categories AS c ON p.categorie_id = c.categorie_id
`;

const conditions = [];
const values = [];

if(searchBarValue?.length>0) {
  const cleanedSearch = searchBarValue.replace(/[^a-zA-Z0-9]/g, '').replace(/\s/g, '');
  conditions.push(`REGEXP_REPLACE(c.categorie_name, '[^a-zA-Z0-9]', '', 'g') 
  ILIKE '%${cleanedSearch}%' OR REGEXP_REPLACE(p.product_name, '[^a-zA-Z0-9]', '', 'g') ILIKE '%${cleanedSearch}%' 
  `);
}
if (categorie!=="All" && categorie?.length>0) {
  conditions.push(`c.categorie_name = $${values.length + 1}`);
  values.push(categorie);
}

  if(checkboxes === "In Stock") {
    conditions.push(`p.available_product>0`);
  } 
  if(checkboxes==="Out of Stock") {
    conditions.push(`p.available_product=0`);
}
if(priceFrom?.length>0 && priceTo?.length===0) {
  //discount problem fixed kora lagbe
  conditions.push(`p.discounted_price >= $${values.length + 1}`);
  values.push(Number(priceFrom));
}
if(priceFrom?.length===0 && priceTo?.length>0) {
  //discount problem fixed kora lagbe
  conditions.push(`p.discounted_price <= $${values.length + 1}`);
  values.push(Number(priceTo));
}
if(priceFrom?.length>0 && priceTo?.length>0 && Number(priceFrom)<=Number(priceTo)) {
  conditions.push(`p.discounted_price BETWEEN ${priceFrom} AND ${priceTo}`);
}
if(priceFrom?.length>0 && priceTo?.length>0 && Number(priceFrom)>Number(priceTo)) {
  conditions.push(`p.discounted_price BETWEEN ${priceTo} AND ${priceFrom}`);
}

if (conditions.length > 0) {
  const whereClause = conditions.join(' AND ');
  if (sortBy==="Price, high to low") {
    query += ` WHERE ${whereClause} ORDER BY p.discounted_price DESC  OFFSET ${(page-1)*10} LIMIT 10`;
  } else {
    query += ` WHERE ${whereClause} ORDER BY p.discounted_price ASC  OFFSET ${(page-1)*10} LIMIT 10`;
  }
} else {
  if (sortBy==="Price, high to low") {
    query += `ORDER BY p.discounted_price DESC  OFFSET ${(page-1)*10} LIMIT 10`;
  } else {
    query += `ORDER BY p.discounted_price ASC  OFFSET ${(page-1)*10} LIMIT 10`;
  }}


const get_all_product = await pool.query(query,values)
    .then((product)=> {
        res.send({
            success: true,
            message: "Successfully fetched all products",
            products : product.rows,
            productLength : product.rows[0]?.total_rows || 0
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

//updated all the products
const updatedAllProducts = async (req,res) => {
  const updated_all_product = await pool.query("UPDATE products SET discounted_price =price - FLOOR((discount * price) / 100)")
  .then((product)=> {
      res.send({
          success: true,
          message: "Successfully Updated all the products",
          products : product.rows
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


//how many pieces sold by a products
const soldAllProducts = async (req,res) => {
  const get_all_product = await pool.query("select op.product_id,sum(op.quantity) as total_quantity,sum(op.price) as total_price  from ordered_product as op left join products as p on op.product_id = p.product_id group by op.product_id")
  .then((product)=> {
      res.send({
          success: true,
          message: "Successfully fetched all products",
          products : product.rows
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

//get product by id 
const getProductById = async (req,res) => {
  const id = req.params.id;
  const getProduct = await pool.query("select p.product_id,p.categorie_id,p.product_name, p.product_description,p.price,p.available_product,p.discount,p.product_image,c.categorie_name from products as p inner join categories as c on p.categorie_id = c.categorie_id where product_id=$1",[id])
  .then((product)=> {
      res.send({
          success: true,
          message: "Successfully fetched",
          products : product.rows
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

module.exports = {addProduct,getAllProducts,getProductById, soldAllProducts,getAllProduct,updatedAllProducts}