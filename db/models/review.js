'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('reviews', {
    rating: { type: Sequelize.INTEGER, allowNull: false },
    description: { type: Sequelize.TEXT }
})

module.exports = Review
