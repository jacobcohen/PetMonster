import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import ReviewBox from '../components/ReviewBox.js'
import {ProductButton} from '../components/ProductButton'
import {addToCart} from '../../reducers/cart'
import {addReview} from '../../reducers/reviews'
import {showModal} from '../../reducers/modals'

function getAvgReviews(reviews) {
  let avg = 0;
  reviews.list.forEach(review => {
    avg += +review.rating
  });
  avg /= reviews.list.length;

  if(isNaN(avg)){
    return "Product has no reviews yet!"
  } else {
    return "Average Review Score: " + avg + " out of 5"
  }
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
        <p>{props.product && props.product.description}</p>
        <hr />
        <h3>Add a review:</h3>
        <ReviewBox  addTheReview={props.addTheReview} />
        <hr />
        <h3>Reviews</h3>
        <Reviews reviews={props.reviews} users={props.users} />
      </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.products.selected,
  reviews: state.reviews,
  user: state.auth,
  cart: state.orders.cart,
  users: state.users.list,
  selectedUser: state.users.selected,
  validReviewer: state.reviews.validReviewer,
  isAdmin: Boolean(state.auth ? state.auth.isAdmin : false)
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(quantity, userId, cart, product){
    dispatch(addToCart(quantity, userId, cart, product))
    dispatch(showModal('CART'))
  },
  addTheReview: (userId, prodId, rating, desc) => {
    dispatch(addReview(userId, prodId, rating, desc))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
