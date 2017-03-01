'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./product')
const OAuth = require('./oauth')
const Review = require('./review')
// const Transaction = require('./transaction')

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


module.exports = {User, Product, Review}
