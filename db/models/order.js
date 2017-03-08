'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')
const Product = require('./product')
const Promise = require('bluebird')

/** util functions */
function getTotal(order) {
    if (order.status === 'active'){
        return order.getProducts()
        .then(products => {
            return products.reduce((acc, product) => {
                return acc + product.price * product.transactions.quantity
            }, 0)
        })
        .then(total => {
            order.total = total
            return order
        })
    }
}

/**
 * Order model
 * FIELDS: id, total, status, [user_id], [created_at], [updated_at]
 * hooks: beforeUpdate (updates the order total every time you add an order to your cart or you change the status of your order)
 * instanceMethods:
 *      addToCart(productId, quantity)
 *      purchase()
 *      emptyCart()
 * associationMethods:
 *      add/get/set Product
 */
const Order = db.define('orders', {
    total: { type: Sequelize.INTEGER, defaultValue: 0 },
    status: { type: Sequelize.ENUM('active', 'created', 'processing', 'completed', 'cancelled'), defaultValue: 'active' }
}, {
    hooks: {
        /**
         * On each update, the order will update its own total if it's a cart.
         * If it's already purchased, the total stays the same.
         */
        beforeUpdate: getTotal,
        beforeBulkUpdate: getTotal
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
        updateCart: function(productId, quantity){
            if (this.status !== 'active') {
                return Promise.reject(new Error('Cannot add to an old order.'))
            }
            return this.getProducts({
                where: { id: productId }
            })
            .then(foundProducts => {
                console.log('>>>>>>seq: trying to update to', quantity, '\n>>>>>>seq: foundProduct is', foundProducts[0].transactions.dataValues)
                if (!foundProducts.length) {
                    return this.addProduct(productId, {quantity})
                } else {
                    if (quantity === 0){
                        return this.removeProduct(foundProducts[0])
                    } else {
                        return foundProducts[0].transactions.updateAttributes({quantity: quantity})
                    }
                }
            })
            .then((newOrUpdatedTransaction) => {
                /** this.save() runs beforeUpdate hook which updates the total.
                 * @return the updated transaction (NOT PRODUCT)
                 *         to be consistent with Sequelize addAssociation.
                */
                // console.log('>>>>>>>seq:', newOrUpdatedTransaction.dataValues)
                // console.log('>>>>>in order, transaction is:', this.products.filter(product => product.id === productId).map(product => product.transactions.dataValues))
                // TODO: this doesn't save transaction changes on the order instance.
                return this.save()
            })
        },
        addToCart: function(productId, quantity){
            if (this.status !== 'active') {
                return Promise.reject(new Error('Cannot add to an old order.'))
            }
            return this.getProducts({
                where: { id: productId }
            })
            .then(foundProducts => {
                if (!foundProducts.length) {
                    return this.addProduct(productId, {quantity})
                } else {
                    if (quantity === 0){
                        return this.removeProduct(foundProducts[0])
                    } else {
                        foundProducts[0].transactions.quantity += quantity
                        return foundProducts[0].transactions.save()
                    }
                }
            })
            .then((newOrUpdatedTransaction) => {
                /** this.save() runs beforeUpdate hook which updates the total.
                 * @return the updated transaction (NOT PRODUCT)
                 *         to be consistent with Sequelize addAssociation.
                */
                return this.save()
            })
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
                return Promise.reject(new Error('Cannot purchase an old order.'))
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
        },
        /** Removes all items from cart, then updates the total by calling 'save'
         *  @return the cart
        */
        emptyCart: function(){
            if (this.status !== 'active') {
                return Promise.reject(new Error('Cannot empty an old order.'))
            }
            return this.setProducts([]).then(() => this.save())
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
