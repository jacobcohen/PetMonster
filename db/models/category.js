'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Category = db.define('categories', {
    name: {type: Sequelize.STRING, allowNull: false}
}, {})

module.exports = Category
