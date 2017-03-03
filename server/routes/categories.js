'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Category = db.model('categories')
const Product = db.model('products')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/all', (req, res, next) =>    // get all categories
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next))
  .post('/', (req, res, next) =>  // post a category
    Category.create(req.body)
    .then(category => res.status(201).json(category))
    .catch(next))
  .param('categoryId', (req, res, next, categoryId) =>  // just a little 'ol param
    Category.findById(categoryId)
    .then(category => {
      if (!category) {
        next(new Error('failed to load category'))
      } else {
        req.category = category
        next()
      }
    })
    .catch(next))
  .get('/:categoryId', (req, res, next) => {  // get a category by id
    res.send(req.category)
  })
  .get('/product/:productId', (req, res, next) => { // get all categories for a product
    Product.findById(+req.params.productId)
    .then(product => {
      console.log(product)
      return product
    })
    .then(product => product.getCategories())
    .then(categories => res.json(categories))
    .catch(next)
  })
  .post('/category/:categoryId/product/:productId', (req, res, next) => {   // add a category to a product
    Product.findById(+req.params.productId)
    .then(product => product.addCategory(req.category))
    .then(addedProductCategory => res.json(addedProductCategory))
    .catch(next)
  })
  .delete('/:categoryId', (req, res, next) => //must put back in mustBeLoggedIn // delete a category from the category database
    req.category.destroy()
      .then(category => res.json(category))
      .catch(next))
  .delete('/category/:categoryId/product/:productId', (req, res, next) => {   // remove a category association from a product
    Product.findById(+req.params.productId)
    .then(product => product.removeCategory(req.category))
    .then(removedProductCategory => res.json(removedProductCategory))
    .catch(next)
  })