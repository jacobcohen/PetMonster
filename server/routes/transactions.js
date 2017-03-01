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
  .get('/orderTransactions/:orderId', (req, res, next) =>
    Order.findById(req.params.orderId)
    .then(order => order.getProducts())
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
      .then(([order, prod]) => {return order.setProducts([prod], req.body)}) //does not return transaction at this time, instead the number of records changed
      .then(([transaction]) => res.status(201).json(transaction))
      .catch(next)
    })
  .get('/:orderId/:productId/', (req, res, next) => {
    Transaction.findOne({where: {order_id: req.params.orderId, product_id: req.params.productId}})
    .then(transaction => {
      if (!transaction) {
        next(new Error('failed to load transaction'))
      } else {
        res.send(transaction)
        next()
      }
    })
    .catch(next)
  })
  // .get('/:transactionId/reviews', (req, res, next) =>
  //   req.transaction.getReviews()
  //   .then(reviews => res.json(reviews))
  //   .catch(next))
  .delete('/:orderId/:productId/', (req, res, next) => //must put back in mustBeLoggedIn
    Transaction.destroy({where: {order_id: req.params.orderId, product_id: req.params.productId}})
      .then(user => res.json(user))
      .catch(next))