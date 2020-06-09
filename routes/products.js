const express = require('express');
const router = express.Router();
const db = require('../util/database');
const Product = require('../models/Product');
const Sequelize = require('sequelize');

// Get product list /products // OK
router.get('/all', (req, res) =>
  Product.findAll()
  .then(products => {
    // console.log(products);c
    // res.sendStatus(200);
    //template products.handlebars
    res.render('products', {
      products
    });
  })
  .catch(err => console.log(err)));

// ADD a new product list // OK
router.post('/new', (req, res) => {
  Product.create({
      name: req.body.name,
      price: req.body.price
    }) //fin create
      .then((addProducts) => {
          res.redirect('/products/all');
      });
});


// get single product by id  // ok
router.get('/find/:id', (req, res) => {
  Product.findAll({
      where: {
        idproduct: req.params.id
      } // OK
    })
    .then(product =>
      res.send(product));
});
// .catch(err => console.log(err));



// delete product //ok
router.delete('/delete/:id', async (req, res) => { //OK
  const {
    id
  } = req.params;
  const product = await Product.findOne({
    where: {
      idproduct: parseInt(id)
    }
  });
  await product.destroy();
  res.send("success");
});

// edit a todo //ok
router.post('/edit-product/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    price
  } = req.body;
  const product = await Product.findOne({
    where: {
      idproduct: id
    }
  });
  product.name = name;
  product.price = price;
  await product.save();
  res.redirect('/products/all');
});
// .catch(err => console.log(err)));

// Display add product form
router.get('/product/add', (req, res) => res.render('add'))
// Add a product
router.get('/product/add', (req, res) => {
  const data = {
    date: "2020-06-07 08:49:43+0000",
    price: 20.9,
    name: "php"
  }

  let {
    date,
    price,
    name
  } = data;

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