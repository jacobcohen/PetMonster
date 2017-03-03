'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users') 
const Product = db.model('products')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', (req, res, next) =>
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next))
  .post('/user/:userId/product/:prodId', (req, res, next) =>
    {   
      const userPromise = User.findById(req.params.userId).catch(next),
            prodPromise = Product.findById(req.params.prodId).catch(next)
      
      Promise.all([userPromise, prodPromise])
      .then(([user, prod]) => {return user.addProductReviews(prod, req.body)})
      .then(([review]) => res.status(201).json(review))
      .catch(next)
    })
    //return user.addProductReviews(product, { rating: 5, description: 'it was the best' });
     
  .param('reviewId', (req, res, next, reviewId) =>
    Review.findById(req.params.reviewId)
    .then(review => {
      if (!review) {
        next(new Error('failed to load review'));
      } else {
        req.review = review
        next()
      }
    })
    .catch(next))
  .get('/:reviewId', (req, res, next) => {
    res.send(req.review)
  })
  .get('/byUser/:userId', (req, res, next) =>
    Review.findAll({where: {user_id: req.params.userId}})
    //req.review.getReviews()
    .then(reviews => res.json(reviews))
    .catch(next))
  .get('/byProd/:prodId', (req, res, next) =>
    Review.findAll({where: {product_id: req.params.prodId}})
    //req.review.getReviews()
    .then(reviews => res.json(reviews))
    .catch(next))
  .delete('/:reviewId', (req, res, next) => //must put back in mustBeLoggedIn
    User.destroy({where: {id: req.params.reviewId}})
      .then(user => res.json(user))
      .catch(next))