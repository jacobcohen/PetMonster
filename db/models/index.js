'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./product')
const OAuth = require('./oauth')
const Review = require('./review')
const Order = require('./order')
const Transaction = require('./transaction')
const Category = require('./category')

OAuth.belongsTo(User)
User.hasOne(OAuth)

User.belongsToMany(Product, {
    as: 'productReviews',
    through: Review
})
Product.belongsToMany(User, {
    as: 'userReviews',
    through: Review
})

User.hasMany(Order)

Order.belongsToMany(Product, { through: Transaction })
Product.belongsToMany(Order, { through: Transaction })

Category.belongsToMany(Product, { through: 'ProductCategory' })
Product.belongsToMany(Category, { through: 'ProductCategory' })

/**
 * how to add an association to instances:
 * user {addOrder, getOrder}
 * order {addProduct(s), getProduct(s)}
 * product {addCategory/ies, getCategory/ies}
 * category {addProduct(s), getProduct(s)}
 */

module.exports = {User, Product, Review, Order, Transaction, Category}
