'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Transaction = db.model('transactions')
const Order = db.model('orders')
const Product = db.model('products')
const User = db.model('users')

const {mustBeLoggedIn, mustBeAdmin, selfOnly} = require('../auth.filters')


module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', (req, res, next) =>
    // Admin can access only
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))
  .get('/cart/:userId', (req, res, next) =>
    // selfOnly or Admin can access
    Order.findOne({where: {user_id: req.params.userId, status: 'active'}})
    .then(order => res.json(order))
    .catch(next))
  .get('/:orderId', (req, res, next) =>
    // selfOnly or Admin can access
    Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next))
  .get('/userOrders/:userId', (req, res, next) =>
    // selfOnly or Admin can access
    Order.findAll({where: {user_id: req.params.userId}})
    .then(order => res.json(order))
    .catch(next))
  .post('/cart/:userId', (req, res, next) =>
    // creates a new cart (new order with status 'active')
    // only use for new account creation
    // does not expect req.body
    // mustBeLoggedIn (or selfOnly or Admin)
  	User.findById(req.params.userId)
  	.then(user => user.createOrder({}))
  	.then(cart => {
  		res.json(cart)
  		return cart})
	.catch(next))
  .put('/cart/:userId/purchased', (req, res, next) =>
    // selfOnly or Admin can access
    // changes status of current cart, and then creates a new cart
  	Order.scope('cart').findOne({where: {user_id: req.params.userId}})
  	.then(order => order.purchase())
  	.then(archivedCart => res.json(archivedCart))
  	.then(() => User.findById(req.params.userId))
  	.then(user => user.createOrder({}))
	.catch(next))
  .put('/cart/:userId/updateCartQuantity', (req, res, next) => { 
  // Use this to add things to cart.
  // Needs req.body which is {prodId, quantity}
  // selfOnly or Admin can access
  // checks that requested quantity does not exceed current stock. If stock exceeded, then error
  	let order = Order.scope('cart').findOne({where: {user_id: req.params.userId}})
  	let product = Product.findById(req.body.prodId)
  					.then((prod) => {
  						if (prod.stock >= req.body.quantity){
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
  .put('/cart/:userId/emptyCart', (req, res, next) => 
  // selfOnly or Admin can access
  	Order.scope('cart').findOne({where: {user_id: req.params.userId}})
	.then(order => {
		return order.setProducts([])
		.then(() => order.update({'total': 0}))
	})
	.then(emptiedCart => res.json(emptiedCart))
	.catch(next))
