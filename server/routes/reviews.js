'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users') 
const Product = db.model('products')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', (req, res, next) => // get all reviews
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next))
  .post('/user/:userId/product/:prodId', (req, res, next) => {  
    // Post a new review.
    // Expects req.body json object to be {"rating": INTEGER, "description": "STRING"}
    // Checks to see if user is a verified purchaser.
    // need to add mustBeLoggedIn again
      const userPromise = User.findById(req.params.userId).catch(next),
            prodPromise = Product.findById(req.params.prodId).catch(next)
      
      Promise.all([userPromise, prodPromise])
      .then(([user, prod]) => {
        return user.verifyPurchase(+req.params.prodId)
        .then(verified => {
          if (verified){
            return [user, prod]
          }
          else {return Promise.reject(new Error('the user is an unverified purchaser'))}
        })
      })
      .then(([user, prod]) => {
        console.log([user, prod])
        return user.addProductReviews(prod, req.body)})
      .then(([review]) => res.status(201).json(review))
      .catch(next)
    })
  .param('reviewId', (req, res, next, reviewId) =>  // this is a param
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
  .get('/:reviewId', (req, res, next) => {    // get review by review id
    res.send(req.review)
  })
  .get('/byUser/:userId', (req, res, next) => // get reviews by user id
    Review.findAll({where: {user_id: req.params.userId}})
    //req.review.getReviews()
    .then(reviews => res.json(reviews))
    .catch(next))
  .get('/byProd/:prodId', (req, res, next) => // get reviews by product id
    Review.findAll({where: {product_id: req.params.prodId}})
    //req.review.getReviews()
    .then(reviews => res.json(reviews))
    .catch(next))
  .get('/byProd/:prodId/averageScore', (req, res, next) => {// get average review score for a product id
    let average = 0
    return Review.findAll({where: {product_id: req.params.prodId}})
    //req.review.getReviews()
    .then(reviews => {
      reviews.forEach((review) => {average += review.rating})
      average /= reviews.length
      res.json(average)
    })
    .catch(next)})
  .delete('/:reviewId', (req, res, next) => // delete a review.  must put back in mustBeLoggedIn
    User.destroy({where: {id: req.params.reviewId}})
      .then(user => res.json(user))
      .catch(next))



