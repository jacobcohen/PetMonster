import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import ReviewBox from '../components/ReviewBox.js'
import {ProductButton} from '../components/ProductButton'
import {addToCart} from '../../reducers/cart'


function getAvgReviews(reviews) {
  let avg = 0;
  reviews.list.forEach(review => {
    avg += +review.rating
  });
  avg /= reviews.list.length;
  return avg
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
        <h1>Average review score: { getAvgReviews(props.reviews) } out of 5! </h1>
        <p>{props.product && props.product.description}</p>
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
  cart: state.cart.list
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(quantity, userId, cart, product){
    dispatch(addToCart(quantity, userId, cart, product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
