'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = require('./product')
const User = require('./user')
const Order = require('./order')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

describe('Review', () => {
  before('wait for the db', () => db.didSync)

  let user, product, order, transaction
  before(function() {

    const productPromise = Product.create({
      name: 'CookieMonster',
      price: 200.00,
      description: 'I love cookies.',
      stock: 5
    })

    const userPromise = User.create({
      firstName: 'Maria',
      lastName: 'X',
      email: 'mx@gmail.com'
    })

    const orderPromise = Order.create({})

    return Promise.all([userPromise, productPromise, orderPromise])
    .then(([createdUser, createdProduct, createdOrder]) => {
        user = createdUser
        product = createdProduct
        order = createdOrder
        return user.addOrder(order)
    })
    .catch(console.error)
  })

  describe('newly created order', () => {
    it('has fields we expect', () => {
        expect(order.total).to.equal('0.00')
        expect(order.status).to.equal('active')
    })
    it('is associated to the user', () => {
        user.getOrders().then((orders) => {
            order = orders[0]
            expect(order.status).to.be.a('string')
        })
    })
  })

  describe('adding a transaction', () => {

    before('associate the product to the order', () => {
        return order.addProduct(product, { quantity: 3 })
        .then(([createdTransaction]) => {
            transaction = createdTransaction[0]
            return order.save()
        })
    })
    it('creates a transaction in the transaction pivot table', () => {
        expect(transaction.quantity).to.equal(3)
    })
    it('runs the beforeUpdate hook on the order, which updates the total', () => {
        expect(order.total).to.equal('600.00')
    })
    it('associates the transaction to the order', () => {
        order.getProducts().then((products) => {
            expect(products[0].name).to.equal('CookieMonster')
        })
    })
  })
})
