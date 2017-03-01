'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
    total: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
    status: { type: Sequelize.ENUM('active', 'created', 'processing', 'completed', 'cancelled'), defaultValue: 'active' }
}, {
    hooks: {
        beforeUpdate: function(instance){
            return instance.getProducts().then(products => {
                return products.reduce((acc, product) => {
                    return acc + product.price * product.transactions.quantity
                }, 0)
            })
            .then(total => {
                instance.total = total
                instance.save()
            })
        }
    },
    scopes: {
        cart: {
            where: { status: 'active' }
        }
    }
})

module.exports = Order
