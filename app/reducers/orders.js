import axios from 'axios'

const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
const RECEIVE_ACTIVE_ORDER = 'RECEIVE_ACTIVE_ORDER'


const initialCartState = {
  list: [],
  active: {}
}

const reducer = (state = initialCartState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_ORDERS:
      newState.list = action.items
      break
    case RECEIVE_ACTIVE_ORDER:
      newState.active = action.item
      break
    default:
      return state
  }

  return newState
}

export const receiveOrders = items => ({
  type: RECEIVE_ORDERS, items
})

export const receiveActiveOrder = item => ({
  type: RECEIVE_ACTIVE_ORDER, item
})

export default reducer
