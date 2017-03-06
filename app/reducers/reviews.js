import axios from 'axios'

const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'

const fakeReviews = []

const initialProductsState = {
  list: fakeReviews
}

const reducer = (state = initialProductsState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_REVIEWS:
      newState.list = action.reviews
      break
    default:
      return state
  }
  return newState
}

export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS, reviews
})


export const getReviewsByProdId = id => {
  return dispatch => {
    axios.get(`/api/reviews/byProd/${id}`)
      .then(res => {
        dispatch(receiveReviews(res.data))
      })
  }
}

export default reducer
