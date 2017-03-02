'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Transaction = db.define('transactions', {
    sellingPrice: { type: Sequelize.DECIMAL(10, 2) },
    quantity: { type: Sequelize.INTEGER, defaultValue: 1 }
}, {
    hooks: {
        beforeUpdate: function(instance){
            console.log('=======beforeUpdate in transaction')
        },
        beforeBulkUpdate: function () {
          console.log('bulk updating transaction')
        },
        beforeBulkCreate: function (stuff) {
          console.log('bulk creating transaction', stuff, this)
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
