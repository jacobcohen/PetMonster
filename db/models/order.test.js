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

  let user, cookieMonster
  before(function() { // seed the db for all tests

    const creatingCookieMonster = Product.create({
      name: 'CookieMonster',
      price: 200.00,
      description: 'I love cookies.',
      stock: 5
    })
    const creatingUser = User.create({
      firstName: 'Maria',
      lastName: 'X',
      email: 'mx@gmail.com'
    })


    return Promise.all([creatingUser, creatingCookieMonster])
    .then(([newUser, newMonster]) => {
        user = newUser
        cookieMonster = newMonster
    })
    .catch(console.error)
  })

  after(function(){ // clean up after all tests
      return Promise.all([
          Product.truncate({cascade: true}),
          User.truncate({cascade: true}),
          Order.truncate({cascade: true}),
          Transaction.truncate({cascade: true})
      ])
  })

  describe('newly created order', () => {

    let order
    before('create an order', () => {
        return Order.create({})
        .then(createdOrder => {
            order = createdOrder
            return user.addOrder(order)
        })
        .catch(console.error)
    })

    after(() => {
        order.destroy()
    })

    it('has fields we expect', () => {
        expect(order.total).to.equal(0)
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

    let order, transaction
    before('create an order', () => {
        return Order.create({})
        .then(createdOrder => {
            order = createdOrder
            return user.addOrder(order)
        })
        .then(updatedUser => order.updateCart(cookieMonster.id, 2))
        .then(([createdTransaction]) => {
            transaction = createdTransaction[0]
        })
        .catch(console.error)
    })

    after(() => {
        order.destroy()
    })

    describe('adding a new product', () => {
        it('should create a transaction in the transaction pivot table', () => {
            expect(transaction.quantity).to.equal(2)
        })
        it('runs the beforeUpdate hook on the order, which updates the total', () => {
            expect(order.total).to.equal(400)
        })
        it('associates the transaction to the order', () => {
            return order.getProducts().then((products) => {
                expect(products[0].name).to.equal('CookieMonster')
            })
        })
    })

    describe('increasing the quantity of a product you already have', () => {
        it('should update the transaction quantity', () => {
            return order.updateCart(cookieMonster.id, 1)
                .then(updatedTransaction => {
                    expect(updatedTransaction.quantity).to.equal(1)
                })
                .catch(console.error)
        })
    })

    describe('removing the quantity of a product you already have', () => {
        it('should delete the product', () => {
            return order.updateCart(cookieMonster.id, 0)
                .then(deleted => {
                    expect(deleted).to.equal(1)
                })
                .catch(console.error)
        })
    })

    describe('emptyCart instance method', () => {
        it('should set the total to zero', () => {
            return order.updateCart(cookieMonster.id, 1)
            .then(newTransaction => {
                return order.emptyCart()
            })
            .then(updatedOrder => {
                expect(updatedOrder.total).to.equal(0)
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
