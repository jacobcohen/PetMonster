'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = db.model('products')
const Category = db.model('categories')
const {mustBeAdmin} = require('../auth.filters')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', (req, res, next) => //get all products. anyone can do it
    Product.findAll({ include: [Category] })
    .then(products => res.json(products))
    .catch(next))
  .post('/', mustBeAdmin, (req, res, next) => //post a product, only admin
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next))
  .param('productId', (req, res, next, productId) =>
    Product.findById(productId)
    .then(product => {
      if (!product) {
        next(new Error('failed to load product'))
      } else {
        req.product = product
        next()
      }
    })
      .catch(next))
  .put('/product/:productId/newStock/:newStock/price/:newPrice', (req, res, next) => {
    req.product.update({stock: req.params.newStock, price: req.params.newPrice})
      .then(result => {
        console.log(result)
        res.status(201).send(result)
      })
      .catch(next)
})
  .get('/:productId', (req, res, next) => { //get specific product. anyone can do it
    res.send(req.product)
  })
  .delete('/:productId', mustBeAdmin, (req, res, next) => //deletes product. only admin
    //Product.destroy({where: {id: req.params.productId}})
    req.product.destroy()
      .then(() => res.send('product deleted'))
      .catch((err) => console.error(err)))
