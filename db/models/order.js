'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')
const Transaction = require('./transaction')
const Promise = require('bluebird')

const Order = db.define('orders', {
    total: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
    status: { type: Sequelize.ENUM('active', 'created', 'processing', 'completed', 'cancelled'), defaultValue: 'active' }
}, {
    hooks: {
        beforeUpdate: function(instance){
            return instance.getProducts()
            .then(products => {
              return products.reduce((acc, product) => {
                  return acc + product.price * product.transactions.quantity
              }, 0)
            })
            .then(total => {
                instance.total = total
            })
        }
    },
    instanceMethods: {
        purchase: function(){
            if (this.status !== 'active') {
                throw Error('Cannot purchase an old order.')
            }
            return this.getProducts()
            .then(products => {
                const promisesForProductUpdates = products.map(product => {
                    product.stock = product.stock - product.transactions.quantity
                    return product.save()
                })
                return Promise.all(promisesForProductUpdates)
            })
            .catch(console.error.bind(console))
            .then(products => {
                const promisesForTransactionUpdates = products.map(product => {
                    product.transactions.sellingPrice = product.transactions.sellingPrice || product.price
                    return product.transactions.save()
                })
                return Promise.all(promisesForTransactionUpdates)
            })
            .catch(console.error.bind(console))
            .then(() =>  {
                this.status = 'created'
                return this.save()
            })
            .catch(console.error.bind(console))
        },
        addToCart: function(product, quantityObject){
            if (this.status !== 'active') {
                throw Error('Cannot purchase an old order.')
            }
            this.getProducts({
                where: {
                    id: product.id
                }
            })
            .then((foundTransaction) => {
                if (!foundTransaction.length) {
                    return this.addProduct(product, quantityObject)
                } else {
                    foundTransaction.quantity += quantityObject.quantity
                    return foundTransaction.save()
                }
            })
            .catch(console.error.bind(console))
        }
    },
    scopes: {
        cart: {
            where: { status: 'active' }
        }
    }
})

module.exports = Order
