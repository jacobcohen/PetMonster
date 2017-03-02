'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')
const Product = require('./product')
const Promise = require('bluebird')

/**
 * Order model
 * FIELDS: id, total, status, [user_id], [created_at], [updated_at]
 * hooks: beforeUpdate (updates the order total every time you add an order to your cart or you change the status of your order)
 * instanceMethods:
 *      addToCart
 *      purchase
 */
const Order = db.define('orders', {
    total: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
    status: { type: Sequelize.ENUM('active', 'created', 'processing', 'completed', 'cancelled'), defaultValue: 'active' }
}, {
    hooks: {
        /**
         * On each update, the order will update its own total if it's a cart.
         * If it's already purchased, the total stays the same.
         */
        beforeUpdate: function(instance){
            if (instance.status === 'active'){
                return instance.getProducts()
                .then(products => {
                    return products.reduce((acc, product) => {
                        return acc + product.price * product.transactions.quantity
                    }, 0)
                })
                .then(total => {
                    instance.total = total
                })
            } else {
                return instance
            }            
        }
    },
    instanceMethods: {
        /**
         * Adds/updates/removes a product item on the active order (cart)
         * If the product is already a line-item in the order, it updates the quantity
         * If it's not there, it is added as a new transaction associated to the order
         * @param product id
         * @param an object with a property 'quantity'
         * @return the new or updated transaction OR the number of items deleted (should always be 1)
         */
        updateCart: function(id, quantity){
            if (this.status !== 'active') {
                throw Error('Cannot add to an old order.')
            }
            return this.getProducts({
                where: {id}
            })
            .then(foundProducts => {
                if (!foundProducts.length) {
                    return Product.findById(id)
                    .then(productToAdd => this.addProduct(productToAdd, {quantity}))
                } else {
                    if (!quantity){
                        return this.removeProduct(foundProducts[0])
                    } else {
                        foundProducts[0].transactions.quantity = quantity
                        return foundProducts[0].transactions.save()
                    }
                }
            })
            .then((newOrUpdatedTransaction) => { 
                /** this.save() runs beforeUpdate hook which updates the total.
                 * @return the updated transaction (NOT PRODUCT)
                 *         to be consistent with Sequelize addAssociation.
                */
                return this.save().then(() => newOrUpdatedTransaction)
            })
            .catch(console.error.bind(console))
        },
        /**
         * Purchase the active order (cart)
         * Sets this instance's status to 'created'
         * Loops through all transactions in that order to set selling price
         * Loops through all associated products to update quantity
         * @return updated order instance
         */
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
                        product.transactions.sellingPrice = product.price
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
        }
    },
    /**
     * Scope for active carts
     */
    scopes: {
        cart: {
            where: { status: 'active' }
        }
    }
})

module.exports = Order