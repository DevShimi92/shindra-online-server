const express = require('express');
const router = express.Router();
const db = require('../util/database');
const Product = require('../models/Product');
const Sequelize = require('sequelize');

// Get product list
router.get('/', (req, res) =>
  Product.findAll()
    .then(products => {
        // console.log(products);c
        // res.sendStatus(200);
        //template
        res.render('products', {
          products
        });
      })
    .catch(err => console.log(err)));


// get single product by id 
router.get('/find/:id', (req, res) => {
  Product.findAll({
    where: {
      idproduct: req.params.id
    }
  })
    .then(product =>
      res.send(product));
      })
    // .catch(err => console.log(err)));

// ADD product list
  router.post('/new', (req, res) =>{
    Product.create({
      text: req.body.text
    })
      .then(submitedProduct =>
        res.send(submitedProduct));
  });

// delete product 
router.get('/delete/:id', (req, res) => {
  Product.destroy({
    where: {
      idproduct: req.params.id
    }
  })
    .then(product =>
      res.send("success"));
      })
    // .catch(err => console.log(err)));

    // edit a todo
// delete product 
router.put('/edit', (req, res) => {
  Product.update(
    {
      text: req.body.text
    },
    {
      where: {
        idproduct: req.body.id
      }
    }
    .then(product =>
      res.send("success")));
      });
    // .catch(err => console.log(err)));

// Display add product form
router.get('/add', (req, res) => res.render('add'))
// Add a product 
router.get('/add', (req, res) => {
  const data = {
    date: "2020-06-07 08:49:43+0000",
    price: 20.9,
    name: "php"
  }

  let { date, price, name } = data;

  // insert into table
  Product.create({
    date,
    price,
    name
  })
  .then(product => res.redirect('/products'))
  .catch(err => console.log(err));
})
module.exports = router;