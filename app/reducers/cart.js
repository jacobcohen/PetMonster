import axios from 'axios'

import { showModal } from './modals'

const RECEIVE_CART_ITEMS = 'RECEIVE_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'

const initialCartState = {
  list: []
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

function isInDB(localTransaction, dbCart) {
  let filtered = dbCart.filter(transaction => transaction.product_id === localTransaction.product_id)

  if (filtered.length) {
    return true
  }
  return false
}

function reconcileLocalCartWithDB(localCart, dbCart, orderId, userId) {
  let onlyLocalTransactions = localCart.filter(transaction => !isInDB(transaction, dbCart))

  onlyLocalTransactions.map(lT =>
    axios.post(`/api/transactions/${orderId}/${lT.product_id}`)
  )
  if (onlyLocalTransactions.length) {
    return Promise.all(onlyLocalTransactions)
    .then(() => {
      return axios.get(`/api/orders/cart/${userId}`)
    })
  }
}

export const getCartItems = userId => {
  return dispatch => {
    axios.get(`/api/orders/cart/${userId}`)
    .then(response => {
      const cart = response.data
      const items = cart ? cart.products : JSON.parse(localStorage.cart)

      let repackagedTransactions = items.map(item => {
        let transactionObj = {
          order_id: item.transactions.order_id,
          product: {
            description: item.description,
            id: item.id,
            imageURLs: item.imageURLs,
            name: item.name,
            price: item.price,
            stock: item.stock
          },
          product_id: item.transactions.product_id,
          quantity: item.transactions.quantity,
          sellingPrice: item.transactions.sellingPrice
        }
        return transactionObj
      })
      dispatch(receiveCartItems(repackagedTransactions))
    })
  }
}

export const updateCart = (productId, quantity, userId) => {
  return dispatch => {
    axios.put(`/api/orders/cart/${userId}/update`, {
      prodId: productId,
      quantity: quantity
    })
    .then(response => {
      let items = response.data.products
      let repackagedTransactions = items.map(item => {
        return {
          order_id: item.transactions.order_id,
          product: {
            description: item.description,
            id: item.id,
            imageURLs: item.imageURLs,
            name: item.name,
            price: item.price,
            stock: item.stock
          },
          product_id: item.transactions.product_id,
          quantity: item.transactions.quantity,
          sellingPrice: item.transactions.sellingPrice
        }
      })
      dispatch(receiveCartItems(repackagedTransactions))
    })
  }
}

export const addToCart = (productId, quantity, userId) => {
  return dispatch => {
    return axios.put(`/api/orders/cart/${userId}/add`, {
      prodId: productId,
      quantity: quantity
    })
    .then(response => {
      let items = response.data.products
      let repackagedTransactions = items.map(item => {
        return {
          order_id: item.transactions.order_id,
          product: {
            description: item.description,
            id: item.id,
            imageURLs: item.imageURLs,
            name: item.name,
            price: item.price,
            stock: item.stock
          },
          product_id: item.transactions.product_id,
          quantity: item.transactions.quantity,
          sellingPrice: item.transactions.sellingPrice
        }
      })
      dispatch(receiveCartItems(repackagedTransactions))
      dispatch(showModal('CART'))
    })
    .catch(console.error)
  }
}

export default reducer
