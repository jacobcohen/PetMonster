'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')
const Promise = require('bluebird')

const Order = db.define('orders', {
    total: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
    status: { type: Sequelize.ENUM('active', 'created', 'processing', 'completed', 'cancelled'), defaultValue: 'active' }
}, {
    hooks: {
        beforeUpdate: function(instance){
          console.log('hhellllooooo')
            return instance.getProducts().then(products => {
              console.log(instance.status)
              if (instance.status != 'active') {
                console.log('also reached', products)
                const updatedProducts = products.map(product => {
                  // console.log('transactions are here:', product.transactions)
                  product.transactions.sellingPrice = product.transactions.sellingPrice || product.price
                  console.log('THIS IS A PRODUCT', product.transactions.sellingPrice)
                  return product.save()
                })

                return Promise.all(updatedProducts)
              } else {
                return products
              }
            })
            .then(products => {
              return products.reduce((acc, product) => {
                  return acc + product.price * product.transactions.quantity
              }, 0)
            })
            .then(total => {
                instance.total = total
            })
        },
        beforeBulkUpdate: function (options) {
          console.log('bulk updating order', options, this)
        }
    },
    scopes: {
        cart: {
            where: { status: 'active' }
        }
    }
})

module.exports = Order
