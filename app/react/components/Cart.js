import React from 'react'
import {connect} from 'react-redux'

import { getCartItems, receiveCartItems } from '../../reducers/cart'
import { CartProductButton } from './CartProductButton'
import { updateCart } from '../../reducers/cart'

import axios from 'axios'

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

function calcAndFormat(q, p) {
  let newP = q * p
  return formatPrice(newP)
}

export const Cart = (props) => (
  <div>
    <h3>Cart</h3>
    <div>
      {}
    </div>
    <div>
      {props.cart && props.cart.map(item => (
        <div key={item.product_id}>
          <h3>{item.product.name}</h3>
          <CartProductButton
              item={item}
              product={item.product}
              handleSubmit={props.updateCart}
              userId={props.user.id}
          />
        </div>
      ))}
    </div>
  </div>
)

const mapStateToProps = state => ({
  cart: state.cart.list,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  updateCart: function(productId, quantity, userId){
    dispatch(updateCart(+productId, +quantity, +userId))
  },
  addProdToCart: (product, user, currentCart) => {
    let foundProduct = currentCart.filter(item => item.product_id === product.id)
    let otherProducts = currentCart.filter(item => item.product_id !== product.id)
    let newCart

    let updatedProduct = foundProduct[0]
    updatedProduct.quantity++
    newCart = otherProducts.concat([updatedProduct])

    dispatch(receiveCartItems(newCart))
    localStorage.cart = JSON.stringify(newCart)
  },
  removeProdFromCart: (product, user, currentCart) => {
    let foundProduct = currentCart.filter(item => item.product_id === product.id)
    let otherProducts = currentCart.filter(item => item.product_id !== product.id)
    let newCart

    let updatedProduct = foundProduct[0]
    updatedProduct.quantity--
    if (updatedProduct.quantity === 0) {
      newCart = otherProducts
    } else {
      newCart = otherProducts.concat([updatedProduct])
    }
    dispatch(receiveCartItems(newCart))
    localStorage.cart = JSON.stringify(newCart)
  }
})

// const mapDispatchToProps = dispatch => ({
//   getCart: (user) => {
//     const isLoggedIn = user.email ? true : false

//     if (isLoggedIn) {
//       getCartItems(user.id)
//     } else {
//       let cart = localStorage.cart
//       let jsCart = JSON.parse(cart)


//     }

//   }
// })

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
