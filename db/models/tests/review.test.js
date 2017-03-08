'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = require('../product')
const User = require('../user')
const {expect} = require('chai')

describe('Review', () => {
  before('wait for the db', () => db.didSync)

  let user, product, review
  before(function() {
    const userPromise = User.create({
      firstName: 'Jake',
      lastName: 'Pressman',
      email: 'jmpressman@gmail.com'
    })

    const productPromise = Product.create({
      name: 'Frankenstein',
      imageURLs: ['one', 'two'],
      price: 100.00,
      description: 'Here is a description of Frankenstein. Highly modular monster. Will stalk you to the ends of the earth. Technically his name is Frankensteins monster. Here is a description of Frankenstein. Highly modular monster. Will stalk you to the ends of the earth. Technically his name is Frankensteins monster. Here is a description of Frankenstein. Highly modular monster. Will stalk you to the ends of the earth. Technically his name is Frankensteins monster.',
      stock: 1
    })

    return Promise.all([userPromise, productPromise])
    .then(([user1, product1]) => {
      user = user1
      product = product1
    })
    .then(() => {
      return user.addProductReview(product, { rating: 5, description: 'it was the best' })
    })
    .then(([createdReview]) => { review = createdReview[0] })
    .catch((err) => {
      console.log(err)
    })
  })

  describe('newly added review', () => {
    it('has fields we expect', () => {
      expect(review.rating).to.equal(5)
      expect(review.description).to.equal('it was the best')
    })
  })
})
