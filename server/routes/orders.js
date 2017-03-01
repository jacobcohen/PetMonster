'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Transaction = db.model('transactions')
const Order = db.model('orders')
const Product = db.model('products')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', (req, res, next) =>
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))
  .get('/:orderId', (req, res, next) =>
    Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next))
  .get('/userOrders/:userId', (req, res, next) =>
    Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next))