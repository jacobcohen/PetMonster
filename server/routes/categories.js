'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Category = db.model('categories')
const Product = db.model('products')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', (req, res, next) =>
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next))
  .post('/', (req, res, next) =>
    Category.create(req.body)
    .then(category => res.status(201).json(category))
    .catch(next))
  .param('categoryId', (req, res, next, categoryId) =>
    Category.findById(req.params.categoryId)
    .then(category => {
      if (!category) {
        next(new Error('failed to load category'))
      } else {
        req.category = category
        next()
      }
    })
    .catch(next))
  .get('/:categoryId', (req, res, next) => {
    res.send(req.category)
  })
  .get('product/:productId', (req, res, next) => {
    //res.send(req.category)
    Product.findById(req.params.productId)
    .then(product => product.getCategories())
    .then(categories => res.json(categories))
  })
  .delete('/:categoryId', (req, res, next) => //must put back in mustBeLoggedIn
    Category.destroy({where: {id: req.params.categoryId}})
      .then(user => res.json(user))
      .catch(next))