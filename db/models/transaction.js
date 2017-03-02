'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Transaction = db.define('transactions', {
    sellingPrice: { type: Sequelize.DECIMAL(10, 2) },
    quantity: { type: Sequelize.INTEGER, defaultValue: 1 }
}, {})

module.exports = Transaction
