import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import {ProductButton} from '../components/ProductButton'
import {addToCart} from '../../reducers/cart'

export const Product = (props) => {
  console.log(props)
  return (
      props.product &&
      <div className="container">
        <h3>{props.product && props.product.name}</h3>
        <ProductButton product={props.product} handleSubmit={props.addToCart} userId={props.user && props.user.id} cart={props.cart} />
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
  user: state.auth,
  cart: state.cart.list
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(productId, quantity, userId, cart, product){
    dispatch(addToCart(productId, quantity, userId, cart, product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
