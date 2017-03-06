import axios from 'axios'

const RECEIVE_CART_ITEMS = 'RECEIVE_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const INC_CART_ITEM_QUANT = 'INC_CART_ITEM_QUANT'
const DEC_CART_ITEM_QUANT = 'DEC_CART_ITEM_QUANT'

const fakeCartItems = []

const initialCartState = {
  list: fakeCartItems
}

const reducer = (state = initialCartState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_CART_ITEMS:
      newState.list = action.items
      break
    case ADD_CART_ITEM:
      newState.list = action.item.concat(newState.list)
      break
    case INC_CART_ITEM_QUANT:
      newState.list = action.item
      break
    case DEC_CART_ITEM_QUANT:
      newState.list = action.item
      break
    default:
      return state
  }

  return newState
}

export const receiveCartItems = items => ({
  type: RECEIVE_CART_ITEMS, items
})

export const addCartItem = item => ({
  type: ADD_CART_ITEM, item
})

export const getCartItems = userId => {
  return dispatch => {
    axios.get(`/api/cart/${userId}`)
    .then(res => {
      dispatch(receiveCartItems(res.data))
    })
  }
}

export default reducer
