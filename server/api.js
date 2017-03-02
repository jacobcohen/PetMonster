'use strict'; // eslint-disable-line semi

require('APP/db')
const api = module.exports = require('express').Router() // eslint-disable-line new-cap

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./routes/users'))
  .use('/products', require('./routes/products'))
  .use('/reviews', require('./routes/reviews'))
  .use('/transactions', require('./routes/transactions'))
  .use('/orders', require('./routes/orders'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
