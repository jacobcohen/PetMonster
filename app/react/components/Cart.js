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
  console.log(cart)
  const total = props.cart.products ? props.cart.products.reduce((accum, current) => {
    return (+current.price * current.transactions.quantity) / 100 + accum
  }, 0) : 0

  return (

  <div>
    <h3>Cart</h3>
    <div>
      Cart Total: {total && numeral(total).format('$0,0.00')}
    </div>
    <div>
      {props.cart && props.cart.map(item => (
        <div key={item.product_id} className="row">
          <h3>{item.product.name}</h3>
          <CartProductButton
              item={item}
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
