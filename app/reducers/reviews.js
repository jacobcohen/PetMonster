import axios from 'axios'

const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
const CHECK_VALID_REVIEWER = 'CHECK_VALID_REVIEWER'
const ADD_REVIEW = 'ADD_REVIEW'

const fakeReviews = [];

const initialProductsState = {
  list: fakeReviews,
  validReviewer: false
}

const reducer = (state = initialProductsState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_REVIEWS:
      newState.list = action.reviews
      break
    case ADD_REVIEW:
      let newReviews = []
      state.list.forEach(review => {
        if(review.user_id === action.review.user_id)
          newReviews.push(action.review)
        else
          newReviews.push(review)
      })
      newState.list = newReviews
      break
    case CHECK_VALID_REVIEWER:
      newState.validReviewer = action.validReviewer
      break

    default:
      return state
  }
  return newState
}

export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS, reviews
})
export const addToReviews = review => ({
  type: ADD_REVIEW, review
})
export const checkValidReviewer = validReviewer => ({
  type: CHECK_VALID_REVIEWER, validReviewer
})


export const getReviewsByProdId = id => {
  return dispatch => {
    axios.get(`/api/reviews/byProd/${id}`)
      .then(res => {
        dispatch(receiveReviews(res.data))
      })
  }
}

export const addReview = (userId, prodId, rating, desc) => {
  return dispatch => {
    axios.post(`/api/reviews/user/${userId}/product/${prodId}`, {rating: +rating, description: desc})
      .then(result => {
        console.log("result in dispatch",result.data[0])
        dispatch(addToReviews(result.data[0]))
      })
  }


}

export const getValidReviewByUserAndProd = (userId, prodId) => {
  return dispatch => {
    axios.get(`/api/reviews/user/${userId}/product/${prodId}`)
      .then(res => {
        dispatch(checkValidReviewer(res.data))
      })
  }
}


export default reducer
