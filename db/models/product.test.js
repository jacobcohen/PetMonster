'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = require('./product')
const {expect} = require('chai')

describe('Product', () => {
  before('wait for the db', () => db.didSync)

  var frankenstein, dracula
  beforeEach(function(){
    frankenstein = Product.build({
      name: 'Frankenstein',
      imageURLs: ['one', 'two'],
      price: 100.00,
      description: 'Here is a description of Frankenstein. Highly modular monster. Will stalk you to the ends of the earth. Technically his name is Frankensteins monster. Here is a description of Frankenstein. Highly modular monster. Will stalk you to the ends of the earth. Technically his name is Frankensteins monster. Here is a description of Frankenstein. Highly modular monster. Will stalk you to the ends of the earth. Technically his name is Frankensteins monster.',
      stock: 1
    })
    dracula = Product.build({
      name: 'Dracula',
      imageURLs: ['one', 'two'],
      price: 200.00,
      description: 'dracula description.',
      stock: 0
    })
  })
  afterEach(function(){
    return Product.truncate({cascade: true})
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
        expect(result.price).to.equal(12)
      })
    })
  })

  describe('instance methods', () => {

    describe('addPicture', () => {
        it('adds a new picture', () => {
          return frankenstein.addPicture('three').then(function(updatedFrank){
            expect(updatedFrank.imageURLs[2]).to.equal('three')
          })
        })
      })

    describe('setDefaultPicture', () => {
      it('moves the nth picture to the front', () => {
        return frankenstein.setDefaultPicture(1).then(function(updatedFrank){
          expect(updatedFrank.imageURLs[0]).to.equal('two')
        })
      })
    })

  })
})
