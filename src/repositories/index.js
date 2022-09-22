require("dotenv").config()
const Client = require("./client");
const Product = require("./products");

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER_PG,
    host: process.env.HOST_PG,
    database: process.env.DB_PG,
    password: process.env.PASS_PG,
    port: 5432,
})

//CRUD PRODUCTS:
const products = new Product ()

const productCRUD = {
  pool: pool,
  brand_id: 1,
  category_id: 1,
  name: 'Tennis Nike Air force',
  description: 'Nice tennis',
  price:'400',
  where: '6',
  deleteID: '8'
}

// products.createProduct(productCRUD)
// products.readProducts(pool)
// products.updateProduct(productCRUD)
// products.deleteProduct(productCRUD)


// CRUD CLIENTS/ADMINS:

const clients = new Client ()

const clientCRUD = {
  pool: pool,
  typeid: 2,
  password: 'passtest321',
  email:'test2@alpha.com',
  document: '388.213.674-24',
  where:'33',
  deleteID: 33
};

// clients.createClient(clientCRUD)
clients.readClients(pool)
// clients.updateClient(clientCRUD)
// clients.deleteClient(clientCRUD)

// TEST RETURN PROMISE:
// test = clients.readClients(pool)
// test.then((x)=>{
//   console.log(x)
// })