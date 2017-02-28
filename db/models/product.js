'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('products', {
    name: { type: Sequelize.STRING, allowNull: false },
    imageURLs: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: 'http://www.illuminessensce.com/wp-content/uploads/2012/12/Image-Coming-Soon-Placeholder.png' },
    price: { type: Sequelize.FLOAT, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    stock: { type: Sequelize.INTEGER, allowNull: false }
}, {
    scopes: {
        inStock: {
            where: { stock: {$gt: 0} }
        }
    }
})

module.exports = Product
