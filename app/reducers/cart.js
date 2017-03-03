import axios from 'axios'

const RECEIVE_CART_ITEMS = 'RECEIVE_CART_ITEMS'

const fakeCartItems = [
  {},
  {}
]

const initialCartState = {
  list: fakeCartItems
}

const reducer = (state = initialCartState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_CART_ITEMS:
      newState.list = action.items
      break
    default:
      return state
  }

  return newState
}

export const receiveCartItems = items => ({
  type: RECEIVE_CART_ITEMS, items
})

export const getCartItems = id => {
  return dispatch => {
    axios.get(`/api/products/${id}`)
    .then(res => {
      dispatch(receiveProduct(res.data))
    })
  }
}

export default reducer
