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
  	Order.scope('cart').findOne({where: {user_id: req.params.userId}})
  	.then(order => order.purchase())
  	.then(archivedCart => res.json(archivedCart))
  	.then(() => User.findById(req.params.userId))
  	.then(user => user.createOrder({}))
	.catch(next))
  .put('/cart/:userId/updateCartQuantity', mustBeLoggedIn, (req, res, next) => {
  // Use this to update things in cart.
  // Needs req.body which is {prodId, quantity}
  // mustBeLoggedIn
  // checks that requested quantity does not exceed current stock. If stock exceeded, then error
  	let order = Order.scope('cart').findOne({where: {user_id: req.params.userId}})
  	let product = Product.findById(req.body.prodId)
  					.then((prod) => {
  						if (prod.stock >= req.body.quantity){
                let newStock = prod.stock - req.body.quantity
                prod.update({'stock': newStock})
  							return true
  						}
  						else {return false}
  					})
  	Promise.all([order, product])
	.then(([order, product]) => {
		if (product) {
			return order.updateCart(req.body.prodId, req.body.quantity)
		}
		else {return Promise.reject(new Error('requested quantity exceeds stock'))}
	})
  	.then(updatedCart => res.json(updatedCart))
	.catch(next)})
  .put('/cart/:userId/logInAndUpdateCart', mustBeLoggedIn, (req, res, next) => { //TEST ME ONCE WE GET LOGGING IN AND CART DONE
    // Use this to add things to cart.
    // Needs req.body which is {prodId, quantity}
    // must be logged in
    // checks that requested quantity does not exceed current stock. If stock exceeded, then error
    let order = Order.scope('cart').findOne({where: {user_id: req.params.userId}})
    let product = Product.findById(req.body.prodId)
      .then((prod) => {
        if (prod.stock >= req.body.quantity){
          let newStock = prod.stock - req.body.quantity
          prod.update({'stock': newStock})
          return true
        }
        else {return false}
      })
    Promise.all([order, product])
      .then(([order, product]) => {
        if (product) {
          return order.addToCart(req.body.prodId, req.body.quantity)
        }
        else {return Promise.reject(new Error('requested quantity exceeds stock'))}
      })
      .then(updatedCart => res.json(updatedCart))
      .catch(next)})
  .put('/cart/:userId/emptyCart', mustBeLoggedIn, (req, res, next) => //empties current cart
  // mustBeLoggedIn
  	Order.scope('cart').findOne({where: {user_id: req.params.userId}})
	.then(order => {
		return order.setProducts([])
		.then(() => order.update({'total': 0}))
	})
	.then(emptiedCart => res.json(emptiedCart))
	.catch(next))
