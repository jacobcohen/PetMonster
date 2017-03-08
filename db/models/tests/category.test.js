'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = require('../product')
const Category = require('../category')
const { expect } = require('chai')

describe('Category', () => {
  before('wait for the db', () => db.didSync)

  var frankenstein, dracula
  beforeEach(function(){
    frankenstein = Product.build({
      name: 'Frankensteins Monster',
      price: 100.00,
      description: 'wassup doc',
      stock: 10
    })
    dracula = Product.build({
      name: 'Dracula',
      imageURLs: ['one', 'two'],
      price: 200.00,
      description: 'hey girl',
      stock: 0
    })
  })

  describe('price attribute', () => {
    it('cannot be null', () => {
      frankenstein.price = null
      return frankenstein.validate().then(function(result){
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('notNull Violation')
      })
    })
    it('has a getter method that trims the decimal to two places', () => {
      frankenstein.price = 12
      return frankenstein.save().then(function(result){
        expect(result.price).to.equal('12.00')
      })
    })
  })
})
