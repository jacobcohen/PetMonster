'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Transaction = db.model('transactions')
const Order = db.model('orders')
const Product = db.model('products')
const User = db.model('users')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', (req, res, next) =>
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))
  .get('/cart/:userId', (req, res, next) =>
    Order.findOne({where: {user_id: req.params.userId, status: 'active'}})
    .then(order => res.json(order))
    .catch(next))
  .get('/:orderId', (req, res, next) =>
    Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next))
  .get('/userOrders/:userId', (req, res, next) =>
    Order.findAll({where: {user_id: req.params.userId}})
    .then(order => res.json(order))
    .catch(next))
  .post('/cart/:userId', (req, res, next) =>
  	User.findById(req.params.userId)
  	.then(user => user.createOrder({}))
  	.then(cart => {
  		res.json(cart)
  		return cart})
	.catch(next))
  .put('/cart/:userId/purchased', (req, res, next) => // dependent on other branch to be merged to master
  	Order.scope('cart').findOne({where: {user_id: req.params.userId}})
  	.then(order => order.purchase())
  	.then(archivedCart => res.json(archivedCart))
	.catch(next))
  .put('/cart/:userId/updateCartQuantity', (req, res, next) =>  //needs req.body.toUpdate which is an array of keyValue pairs {prodId, quantity}
  	Order.scope('cart').findOne({where: {user_id: req.params.userId}})
  	.then(order => {
  		 req.body.toUpdate.forEach((updateTransaction) => order.updateCart(updateTransaction.prodId, {quantity: updateTransaction.quantity}))
  	})
  	.then(archivedCart => res.json(archivedCart))
	.catch(next))
  .put('/cart/:userId/emptyCart', (req, res, next) => //needs req.body.status
  	Order.scope('cart').findOne({where: {user_id: req.params.userId}})
	.then(order => {
		return order.setProducts([])
		.then(() => order.update({'total': 0.00}))
	})
	.then(emptiedCart => res.json(emptiedCart))
	.catch(next))