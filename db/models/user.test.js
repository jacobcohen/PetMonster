'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const {expect} = require('chai')

describe('User', () => {

  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })

  describe('verifyPurchase(productId) ~> Boolean', () => {

    let user, cookieMonster, theThing, order
    before('seed database', () => {
      let creatingTheThing = Product.create({
        name: 'The Thing',
        price: 20000,
        description: 'Immagetchu',
        stock: 10
      })
      const creatingCookieMonster = Product.create({
        name: 'CookieMonster',
        price: 200.00,
        description: 'I love cookies.',
        stock: 5
      })
      const creatingUser = User.create({
        firstName: 'Bob',
        lastName: 'Burger',
        email: 'bb@gmail.com'
      })
      const creatingOrder = Order.create({})

      return Promise.all([creatingUser, creatingCookieMonster, creatingTheThing, creatingOrder])
        .then(([newUser, newMonster, newThing, newOrder]) => {
          user = newUser
          cookieMonster = newMonster
          theThing = newThing
          order = newOrder
        })
        .then(() => {
          return Promise.all([
            order.updateCart(theThing.id, 5),
            order.updateCart(cookieMonster.id, 2),
            user.addOrder(order)
          ])
        })
        .then(() => order.purchase())
        .catch(console.error)
    })

    after(() => User.truncate({cascade: true}))

    it('returns true if the user has purchased the product', () => {
      return Promise.all([user.verifyPurchase(1), user.verifyPurchase(2)])
        .then(verifications => verifications.reduce((acc, verified) => acc || verified, false))
        .then(bothVerified => {
          expect(bothVerified).to.equal(true)
        })
    })
    it('returns false if the user has not purchased the product', () => {
      return user.verifyPurchase(3)
        .then((verified) => {
          expect(verified).to.equal(false)
        })
    })
  })
})
