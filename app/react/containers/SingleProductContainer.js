import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import ReviewBox from '../components/ReviewBox.js'

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
  return avg
}


export const Product = (props) => (
  <div className="container">
    <h3>{props.product && props.product.name}</h3>
    <img src={props.product.imageURLs && props.product.imageURLs[0]} height="320" width="320" />
    <div className="caption">
      <h1>Average review score: { getAvgReviews(props.reviews) } out of 5! </h1>
      <h4>${props.product && formatPrice(props.product.price)}</h4>
      <button type="button" className="btn btn-secondary">+</button>
    </div>
    <hr />
    <p>{props.product && props.product.description}</p>
    <hr />
    <h3>Add a review:</h3>
    <ReviewBox />
    <hr />
    <h3>Reviews</h3>
    <Reviews reviews={props.reviews} users={props.users}/>
  </div>
)

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.products.selected,
  reviews: state.reviews,
  users: state.users.list,
  selectedUser: state.users.selected,
  validReviewer: state.reviews.validReviewer
})


export default connect(mapStateToProps)(Product)
