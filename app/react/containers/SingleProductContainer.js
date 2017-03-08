import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import ReviewBox from '../components/ReviewBox.js'
import {ProductButton} from '../components/ProductButton'
import {addToCart} from '../../reducers/cart'
import {showModal} from '../../reducers/modals'


function getAvgReviews(reviews) {
  let avg = 0;
  if (!reviews.length) return "No Reviews"
  reviews.list.forEach(review => {
    avg += +review.rating
  });
  avg /= reviews.list.length;
  return `Reviews: ${avg} out of 5`
}


export const Product = (props) => {
  return (
      props.product && 
      <div className="container">
        <ProductButton
          product={props.product}
          handleSubmit={props.addToCart}
          userId={props.auth && props.auth.id}
          cart={props.cart} />
        <hr />
        <h1>{ getAvgReviews(props.reviews) }</h1>
        <hr />
        <h3>Add a review:</h3>
        <ReviewBox />
        <hr />
        <h3>Reviews</h3>
        <Reviews reviews={props.reviews} users={props.users}/>
      </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.products.selected,
  reviews: state.reviews,
  users: state.users.list,
  validReviewer: state.reviews.validReviewer,
  cart: state.orders.cart
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(quantity, userId, cart, product){
    dispatch(addToCart(quantity, userId, cart, product))
    dispatch(showModal('CART'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
