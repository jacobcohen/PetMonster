'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Category = db.model('categories')
const Product = db.model('products')

const {mustBeAdmin} = require('../auth.filters')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', (req, res, next) =>
  // get all categories
  // Everyone can access
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next))
  .param('categoryId', (req, res, next, categoryId) =>  // just a little 'ol param-a-ram-ram
    Category.findById(categoryId, {include: [Product]})
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
  // get a category by category id
  // Everyone can access
    res.send(req.category)
  })
  .get('/product/:productId', (req, res, next) => {
  // get all categories for a product by product id
  // Everyone can access
    Product.findById(+req.params.productId)
    .then(product => {
      console.log(product)
      return product
    })
    .then(product => product.getCategories())
    .then(categories => res.json(categories))
    .catch(next)
  })
  .use(mustBeAdmin)
  .post('/category/:categoryId/product/:productId', (req, res, next) => {
  // add an existing category (by id) to an existing product (by id)
  // Admin can access only
    Product.findById(+req.params.productId)
    .then(product => product.addCategory(req.category))
    .then(addedProductCategory => res.json(addedProductCategory))
    .catch(next)
  })
  .delete('/:categoryId', (req, res, next) => 
  // Admin can access only
  // delete a category from the category database
    req.category.destroy()
      .then(category => res.json(category))
      .catch(next))
  .delete('/category/:categoryId/product/:productId', (req, res, next) => {   
  // remove a category association from a product
  // Admin can access only
    Product.findById(+req.params.productId)
    .then(product => product.removeCategory(req.category))
    .then(removedProductCategory => res.json(removedProductCategory))
    .catch(next)
  })
  .post('/', (req, res, next) =>
  // post a category
  // expects req.body as json object = {"name": "string"}
  // Admin can access only
    Category.create(req.body)
    .then(category => res.status(201).json(category))
    .catch(next))