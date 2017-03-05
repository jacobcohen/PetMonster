import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import { getCartItems, receiveCartItems } from '../reducers/cart'

import axios from 'axios'

export const Products = (props) => (
  <div>
    <h3>Cart</h3>
    <div>
      {}
    </div>
    <div>
      {props.cart && props.cart.map(item => (
        <div key={item.product_id}>
          <h3>{item.product.name}</h3>
          <p>quantity: {item.quantity}</p>
          <p>${+item.quantity * +item.product.price}</p>
          <button type="button" className="btn btn-secondary" onClick={() => props.addProdToCart(item.product, props.user, props.cart)}>+</button>
          <button type="button" className="btn btn-secondary" onClick={() => props.removeProdFromCart(item.product, props.user, props.cart)}>-</button>
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
  addProdToCart: (product, user, currentCart) => {
    let foundProduct = currentCart.filter(item => item.product_id === product.id)
    let otherProducts = currentCart.filter(item => item.product_id !== product.id)
    let newCart

    let updatedProduct = foundProduct[0]
    updatedProduct.quantity++
    newCart = otherProducts.concat([updatedProduct])
    console.log(newCart)
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
      console.log(newCart)
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

export default connect(mapStateToProps, mapDispatchToProps)(Products)
