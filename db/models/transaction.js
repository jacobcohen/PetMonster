'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Transaction = db.define('transactions', {
    sellingPrice: { type: Sequelize.DECIMAL(10, 2) },
    quantity: { type: Sequelize.INTEGER, defaultValue: 1 }
}, {
    hooks: {
        beforeBulkCreate: function(params){
            console.log(params)
            console.log('=======beforeBulkCreate in transaction')
            
        }
    },
    instanceMethods: {
        markSold: function(){
            this.sellingPrice = this.product.price * this.quantity
            return this.save()
        }
    }
})

module.exports = Transaction
