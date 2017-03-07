import axios from 'axios'

const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
const CHECK_VALID_REVIEWER = 'CHECK_VALID_REVIEWER'

const fakeReviews = [];

const initialProductsState = {
  list: fakeReviews,
  validReviewer: true
}

const reducer = (state = initialProductsState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_REVIEWS:
      newState.list = action.reviews
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

// export const getValidReviewByUserAndProd = (userId, prodId) => {
//   return dispatch => {
//     axios.get(`/api/reviews/user/${userId}/product/${prodId}`)
//       .then(res => {
//         dispatch(checkValidReviewer(res.data))
//       })
//   }
// }


export default reducer
