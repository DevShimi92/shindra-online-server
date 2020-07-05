const Sequelize = require('sequelize');
const db = require('../util/database');

// module.exports = (sequelize, DataTypes) => {

const Product = db.define('product', {
  idproduct: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 20
  },
  name: {
    type: Sequelize.STRING,
  }
});

Product.sync().then(() => {
  console.log('table created');
});
module.exports = Product;