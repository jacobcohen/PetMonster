'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Transaction = db.model('transactions')
const Order = db.model('orders')
const Product = db.model('products')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', (req, res, next) =>
    Transaction.findAll()
    .then(transactions => res.json(transactions))
    .catch(next))
  .post('/:orderId/:productId/', (req, res, next) => {
      //order.addProduct
      const orderPromise = Order.findById(req.params.orderId).catch(next),
            prodPromise = Product.findById(req.params.productId).catch(next)  
      Promise.all([orderPromise, prodPromise])
      .then(([order, prod]) => {return order.addProduct(prod, req.body)})
      .then(([transaction]) => res.status(201).json(transaction))
      .catch(next)
    })
  .put('/:orderId/:productId/', (req, res, next) => {
      const orderPromise = Order.findById(req.params.orderId).catch(next),
            prodPromise = Product.findById(req.params.productId).catch(next)  
      Promise.all([orderPromise, prodPromise])
      .then(([order, prod]) => {return order.setProduct(prod, req.body)})
      .then(([transaction]) => res.status(201).json(transaction))
      .catch(next)
    })
  .param('transactionId', (req, res, next, transactionId) =>
    Transaction.findById(req.params.transactionId)
    .then(transaction => {
      if (!transaction) {
        next(new Error('failed to load transaction'))
      } else {
        req.transaction = transaction
        next()
      }
    })
    .catch(next))
  .get('/:transactionId', (req, res, next) => {
    res.send(req.transaction)
  })
  // .get('/:transactionId/reviews', (req, res, next) =>
  //   req.transaction.getReviews()
  //   .then(reviews => res.json(reviews))
  //   .catch(next))
  .delete('/:transactionId', (req, res, next) => //must put back in mustBeLoggedIn
    Transaction.destroy({where: {id: req.params.transactionId}})
      .then(user => res.json(user))
      .catch(next))