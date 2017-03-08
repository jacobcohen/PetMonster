import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import { CartProductButton } from './CartProductButton'
import { updateCart } from '../../reducers/cart'

function calcAndFormat(q, p) {
  let newP = (q * p) / 100
  return numeral(newP).format('$0,0.00')
}

export const Cart = (props) => {

  const cart = props.cart
  console.log('in Cart.js, cart is', cart)
  const total = cart.products ? cart.products.reduce((accum, current) => {
    return (+current.price * current.transactions.quantity) / 100 + accum
  }, 0) : 0
console.log(cart)
  return (

  <div>
    <h3>Cart: {total && numeral(total).format('$0,0.00')}</h3>
    <div>
      {
        cart.map(item => (
          <div key={item.product_id} className="row">
            <CartProductButton
                item={item}
                cart={cart}
                handleSubmit={props.updateCart}
                userId={props.user && props.user.id}
                format={calcAndFormat}
            />
          </div>
        ))
      }
    </div>
    <br />
    <div>
      {cart.products ? <button type="button" className="btn btn-success">Place Order</button> : <p>There are no items in your cart :(</p> }
    </div>
  </div>
)}

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  updateCart: function(quantity, userId, cart, product){
    dispatch(updateCart(quantity, userId, cart, product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
