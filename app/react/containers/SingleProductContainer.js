import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import ReviewBox from '../components/ReviewBox.js'
import {ProductButton} from '../components/ProductButton'
import {addToCart} from '../../reducers/cart'
import {addReview} from '../../reducers/reviews.js'

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

function getAvgReviews(reviews) {
  let avg = 0;
  reviews.list.forEach(review => {
    avg += +review.rating
  });
  avg /= reviews.list.length;

  console.log(avg)
  if(isNaN(avg))
    return "Product has no reviews yet!"
  else
    return "Average Review Score: " + avg + " out of 5"
}

export const Product = (props) => {
  return (
      props.product &&
      <div className="container">
        <h3>{props.product && props.product.name}</h3>
        <ProductButton product={props.product} handleSubmit={props.addToCart} userId={props.auth && props.auth.id} />
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
  users: state.users.list,
  selectedUser: state.users.selected,
  validReviewer: state.reviews.validReviewer,
  isAdmin: Boolean(state.auth ? state.auth.isAdmin : false)
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(productId, quantity, userId){
    dispatch(addToCart(productId, quantity, userId))
  },
  addTheReview: (userId, prodId, rating, desc) => {
    dispatch(addReview(userId, prodId, rating, desc))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
