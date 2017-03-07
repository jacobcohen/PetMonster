import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'

import { getCartItems, receiveCartItems } from '../../reducers/cart'
import { CartProductButton } from './CartProductButton'
import { updateCart } from '../../reducers/cart'

import axios from 'axios'

// function formatPrice(price) {
//   let dPrice = price / 100
//   let sdPrice = '' + dPrice

//   if (dPrice > 1000000) {
//     sdPrice = sdPrice.slice(0, 1) + ',' + sdPrice.slice(1, 4) + ',' + sdPrice.slice(4)
//   } else if (dPrice > 100000) {
//     sdPrice = sdPrice.slice(0, 3) + ',' + sdPrice.slice(3)
//   } else if (dPrice > 10000) {
//     sdPrice = sdPrice.slice(0, 2) + ',' + sdPrice.slice(2)
//   } else if (dPrice > 1000) {
//     sdPrice = sdPrice.slice(0, 1) + ',' + sdPrice.slice(1)
//   }

//   if (dPrice % 1 === 0) {
//     return sdPrice + '.00'
//   } else {
//     return sdPrice
//   }
// }

function calcAndFormat(q, p) {
  let newP = (q * p) / 100
  return numeral(newP).format('$0,0.00')
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
              cart={props.cart}
              handleSubmit={props.updateCart}
              userId={props.user && props.user.id}
              format={calcAndFormat}
          />
        </div>
      ))}
    </div>
    <br />
    <div>
      {props.cart.length ? <button type="button" className="btn btn-success">Place Order</button> : <p>There are no items in your cart :(</p> }
    </div>
  </div>
)

const mapStateToProps = state => ({
  cart: state.cart.list,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  updateCart: function(productId, quantity, userId, cart, product){
    dispatch(updateCart(productId, quantity, userId, cart, product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
