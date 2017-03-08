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
  return (

  <div>
    <h3>Cart</h3>
    <div>
      total: {props.cart && props.cart.total}
    </div>
    <div>
      {props.cart && props.cart.map(item => (
        <div key={item.product_id} className="row">
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
)}

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
