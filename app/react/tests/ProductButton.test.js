import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {spy} from 'sinon'

import {ProductButton} from '../components/ProductButton'

describe('ProductButton component', () => {

    let product, onSubmitSpy
    let sampleProduct = {
        id: 1,
        name: 'Honeynut Cheerios',
        stock: 100,
        price: 499
    }
    beforeEach('Create component and onChange spy', () => {
        onSubmitSpy = spy()
        product = shallow(<ProductButton
            handleSubmit={onSubmitSpy}
            product={sampleProduct}
            userId={5} />)
    })

    describe('visual content', function(){
        it('serves up a div with class \'product-button\'', () => {
            expect(product.get(0).props.id).to.equal('product-button')
        })
    })

    describe('interactivity', function(){
        it('receives a product, a handler function, and a userId through props', () => {
            expect(product.unrendered.props.userId).to.equal(5)
        })

        it('calls handleSubmit when form is clicked', () => {
            expect(onSubmitSpy).not.to.have.been.called
            product.find('form').simulate('submit', {
                preventDefault(){},
                target: {quantity: {value: 1}}
            })
            expect(onSubmitSpy.called).to.be.true
        })
    })


})
