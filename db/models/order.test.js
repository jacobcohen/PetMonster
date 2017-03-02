'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = require('./product')
const User = require('./user')
const Order = require('./order')
const Transaction = require('./transaction')

const Promise = require('bluebird')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

describe('Order model', () => {
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

  after(function(){
      return Promise.all([
          Product.truncate({cascade: true}),
          User.truncate({cascade: true}),
          Order.truncate({cascade: true}),
          Transaction.truncate({cascade: true})
      ])
  })

  describe('newly created order', () => {
    it('has fields we expect', () => {
        expect(order.total).to.equal('0.00')
        expect(order.status).to.equal('active')
    })
    it('is associated to the user', () => {
        return user.getOrders().then((orders) => {
            order = orders[0]
            expect(order.status).to.be.a('string')
        })
    })
  })

  describe('adding a transaction to an active order (cart)', () => {

    before('add product to cart', () => {
        return order.addToCart(product, { quantity: 3 })
        .then(([createdTransaction]) => {
            transaction = createdTransaction[0]
        })
        .catch(console.error)
    })

    describe('adding a new product', () => {
        it('should create a transaction in the transaction pivot table', () => {
            expect(transaction.quantity).to.equal(3)
        })
        it('runs the beforeUpdate hook on the order, which updates the total', () => {
            expect(order.total).to.equal(600)
        })
        it('associates the transaction to the order', () => {
            return order.getProducts().then((products) => {
                expect(products[0].name).to.equal('CookieMonster')
            })
        })
    })

    describe('increasing the quantity of a product you already have', () => {
        it('should update the transaction quantity', () => {
            return order.addToCart(product, {quantity: 1})
                .then(updatedTransaction => {
                    expect(updatedTransaction.quantity).to.equal(4)
                })
                .catch(console.error)
        })
    })
  })

  describe('purchasing a cart', () => {

    let purchasedProducts
    before('purchase the order', () => {
        return order.purchase()
        .then(updatedOrder => {
            return updatedOrder.getProducts()
        })
        .then(([products]) => {
            purchasedProducts = products
        })
        .catch(console.error)
    })

    it('sets the order status to CREATED', () => {
        expect(order.status).to.equal('created')
    })

    it('sets the selling price on a transaction', () => {
        expect(purchasedProducts.transactions.sellingPrice).to.equal('200.00')
    })

    it('decreases the product stock by the amount purchased', () => {
        expect(purchasedProducts.stock).to.equal(1)
    })

  })

})
