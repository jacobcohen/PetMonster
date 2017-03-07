'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users')
const Product = db.model('products')

const {mustBeLoggedIn, selfOnly} = require('../auth.filters')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', (req, res, next) => // get all reviews, anyone can do it
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next))
  .get('/user/:userId/product/:prodId', mustBeLoggedIn, (req, res, next) => {
      User.findById(req.params.userId)
      .then(user => {

        return user.verifyPurchase(+req.params.prodId)
      })
      .then(verified => {
        if (verified){
          res.json({"value":true})
        }
        else {
          res.json({"value":false})
        }
      })
      .catch(next)
  })
  .post('/user/:userId/product/:prodId', mustBeLoggedIn, (req, res, next) => {
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
          else {
            return [false, false]
            //return Promise.reject(new Error('the user is an unverified purchaser'))
          }
        })
      })
      .then(([user, prod]) => {
        if(!user) return [false]
        return user.addProductReviews(prod, req.body)})
      .then(([review]) => {
        if(!review) return res.status(201).send(false)
        return res.status(201).json(review)
      })
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
  .get('/:reviewId', (req, res, next) => {    // get review by review id. anyone can do it
    res.send(req.review)
  })
  .get('/byUser/:userId', (req, res, next) => // get reviews by user id. anyone can do it
    Review.findAll({where: {user_id: req.params.userId}})
    //req.review.getReviews()
    .then(reviews => res.json(reviews))
    .catch(next))
  .get('/byProd/:prodId', (req, res, next) => // get reviews by product id. anyone can do it.
    Review.findAll({where: {product_id: req.params.prodId}})
    //req.review.getReviews()
    .then(reviews => res.json(reviews))
    .catch(next))
  .get('/byProd/:prodId/averageScore', (req, res, next) => {// get average review score for a product id. anyone can do it
    let average = 0
    return Review.findAll({where: {product_id: req.params.prodId}})
    //req.review.getReviews()
    .then(reviews => {
      reviews.forEach((review) => {average += review.rating})
      average /= reviews.length
      res.json(average)
    })
    .catch(next)})
  .delete('/:reviewId', selfOnly, (req, res, next) => // delete a review. self only
    User.destroy({where: {id: req.params.reviewId}})
      .then(user => res.json(user))
      .catch(next))



