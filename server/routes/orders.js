'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Transaction = db.model('transactions')
const Order = db.model('orders')
const Product = db.model('products')
const User = db.model('users')

const {mustBeLoggedIn, mustBeAdmin, selfOnly} = require('../auth.filters')


module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', mustBeAdmin, (req, res, next) => //get all users
    // Admin can access only
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))
  .get('/cart/:userId', (req, res, next) => //get cart for specific user
    // anyone can in order to log in
    Order.findOne({where: {user_id: req.params.userId, status: 'active'}, include: [Product] })
    .then(order => {
      res.json(order)
    })
    .catch(next))
  .get('/:orderId', mustBeAdmin, (req, res, next) => //get specific cart
    // Admin can access specific cart
    Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next))
  .get('/userOrders/:userId', (req, res, next) =>  //get all orders for specific user
    // not sure yet, but most likely an anonymous
    Order.findAll({where: {user_id: req.params.userId}})
    .then(order => res.json(order))
    .catch(next))
  .post('/cart/:userId', mustBeLoggedIn, (req, res, next) => // creates a new cart (new order with status 'active')
    // only use for new account creation
    // does not expect req.body
    // mustBeLoggedIn
    User.findById(req.params.userId)
    .then(user => user.createOrder({}))
    .then(cart => {
      res.json(cart)
      return cart})
	.catch(next))
  .put('/cart/:userId/purchased', mustBeLoggedIn, (req, res, next) => //purchasing current transactions in cart -> changes order status and then creates a new cart
  //must be logged in
    Order
      .scope('cart')
      .findOne({
        where: { user_id: req.params.userId }
      })
    .then(order => order.purchase())
    .then(archivedCart => res.json(archivedCart))
    .then(() => User.findById(req.params.userId))
    .then(user => user.createOrder({}))
	.catch(next))
  .put('/cart/:userId/update', mustBeLoggedIn, (req, res, next) => {
    //TEST ME ONCE WE GET LOGGING IN AND CART DONE
    // Use this to add things to cart.
    // Needs req.body which is {prodId, quantity}
    // must be logged in
    // checks that requested quantity does not exceed current stock. If stock exceeded, then error
    let userId = +req.params.userId
    let productId = +req.body.prodId
    let quantity = +req.body.quantity
    console.log(userId, productId, quantity)

    Order
      .scope('cart')
      .findOne({
        where: { user_id: userId },
        include: [Product]
      })
      .then(foundOrder => {
        return foundOrder.updateCart(productId, quantity)
      })
      .then(updatedCart => {
        return Order
          .scope('cart')
          .findOne({
            where: { user_id: userId },
            include: [Product]
          })
      })
      .then((updatedCart) => {
        res.json(updatedCart)
      })
      .catch(next)
    })
  .put('/cart/:userId/add', mustBeLoggedIn, (req, res, next) => {
    //TEST ME ONCE WE GET LOGGING IN AND CART DONE
    // Use this to add things to cart.
    // Needs req.body which is {prodId, quantity}
    // must be logged in
    // checks that requested quantity does not exceed current stock. If stock exceeded, then error
    let userId = +req.params.userId
    let productId = +req.body.prodId
    let quantity = +req.body.quantity

    Order
      .scope('cart')
      .findOne({
        where: { user_id: userId },
        include: [Product]
      })
      .then(foundOrder => foundOrder.addToCart(productId, quantity))
      .then(() => {
        return Order
          .scope('cart')
          .findOne({
            where: { user_id: userId },
            include: [Product]
          })
      })
      .then((updatedCart) => {
        res.json(updatedCart)
      })
      .catch(next)
    })
  .put('/cart/:userId/emptyCart', mustBeLoggedIn, (req, res, next) => //empties current cart
  // mustBeLoggedIn
    Order
      .scope('cart')
      .findOne({
        where: { user_id: req.params.userId }
      })
    .then(order => {
      return order.setProducts([])
      .then(() => order.update({total: 0}))
    })
	.then(emptiedCart => res.json(emptiedCart))
	.catch(next))
