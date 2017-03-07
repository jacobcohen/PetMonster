import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import {ProductButton} from '../components/ProductButton'
import {addToCart} from '../../reducers/cart'

function formatPrice(price) {
  let dPrice = price / 100
  let sdPrice = '' + dPrice

  if (dPrice > 1000000) {
    sdPrice = sdPrice.slice(0, 1) + ',' + sdPrice.slice(1, 4) + ',' + sdPrice.slice(4)
  } else if (dPrice > 100000) {
    sdPrice = sdPrice.slice(0, 3) + ',' + sdPrice.slice(3)
  } else if (dPrice > 10000) {
    sdPrice = sdPrice.slice(0, 2) + ',' + sdPrice.slice(2)
  } else if (dPrice > 1000) {
    sdPrice = sdPrice.slice(0, 1) + ',' + sdPrice.slice(1)
  }

  if (dPrice % 1 === 0) {
    return sdPrice + '.00'
  } else {
    return sdPrice
  }
}

export const Product = (props) => {
  return (
      props.product &&
      <div className="container">
        <h3>{props.product && props.product.name}</h3>
        <ProductButton
          product={props.product}
          handleSubmit={props.addToCart}
          userId={props.user && props.user.id} />
        <hr />
        <p>{props.product && props.product.description}</p>
        <hr />
        <Reviews reviews={props.reviews} />
      </div>
  )
}

const mapStateToProps = state => ({
  product: state.products.selected,
  reviews: state.reviews,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(productId, quantity, userId){
    dispatch(addToCart(productId, quantity, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
