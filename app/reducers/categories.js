import axios from 'axios'

const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
const SET_CATEGORY = 'SET_CATEGORY'

const initialCategoriesState = [{
  all: [],
  selected: ''
}]

/** Reducer */
const reducer = (state = initialCategoriesState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      newState.all = action.categories
      break
    case SET_CATEGORY:
      newState.selected = action.category
      break
    default:
      return state
  }

  return newState
}

/** Action creators */
export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const setCategory = category => ({
  type: SET_CATEGORY,
  category
})

/** Thunked action creators */
export const fetchAllCategories = () => {
  return dispatch => {
    axios.get(`/api/categories/all`)
    .then(res => {
      dispatch(receiveCategories(res.data))
    })
  }
}

export const fetchCategory = name => {
  return dispatch => {
    axios.get(`/api/categories/${name}`)
    .then(res => {
      dispatch(setCategory(res.data))
    })
  }
}

export default reducer
