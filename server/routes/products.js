'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = db.model('products')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', (req, res, next) =>
    Product.findAll()
    .then(products => res.json(products))
    .catch(next))
  .post('/', (req, res, next) =>
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next))
  .param('productId', (req, res, next, productId) =>
    Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        next(new Error('failed to load product'))
      } else {
        req.product = product
        next()
      }
    })
    .catch(next))
  .get('/:productId', (req, res, next) => {
    res.send(req.product)
  })
  // .get('/:productId/reviews', (req, res, next) =>
  //   req.product.getReviews()
  //   .then(reviews => res.json(reviews))
  //   .catch(next))
  .delete('/:productId', (req, res, next) => //must put back in mustBeLoggedIn
    Product.destroy({where: {id: req.params.productId}})
      .then(user => res.json(user))
      .catch(next))