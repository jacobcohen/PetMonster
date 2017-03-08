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

// helper functions

function isInDB(localTransaction, dbCart) {
  let filtered = dbCart.filter(transaction => transaction.product_id === localTransaction.product_id)

  if (filtered.length) {
    return true
  }
  return false
}

function reconcileLocalCartWithDB(localCart, dbCart, userId) {
  if (!localCart.length) return axios.get(`/api/orders/cart/${userId}`)

  let onlyLocalTransactions = localCart.filter(transaction => !isInDB(transaction, dbCart))

  let postedTransactions = onlyLocalTransactions.map(lT =>
    axios.put(`/api/orders/cart/${userId}/add`, {
      prodId: lT.product_id,
      quantity: lT.quantity
    })
  )

  if (postedTransactions.length) {
    return Promise.all(postedTransactions)
    .then(() => {
      return axios.get(`/api/orders/cart/${userId}`)
    })
  } else {
    return axios.get(`/api/orders/cart/${userId}`)
  }
}

function packageTransaction(orderId, description, prodId, imageURLs, name, price, stock, oProdId, q, sP) {
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
}

// thunked actions

export const getCartItems = userId => {
  return dispatch => {
    axios.get(`/api/orders/cart/${userId}`)
    .then(response => {
      const items = response.data.products
      const localCart = JSON.parse(localStorage.cart)
      return reconcileLocalCartWithDB(localCart, items, userId)
    })
    .then(response => {
      const items = response.data.products
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

export const updateCart = (productId, quantity, userId, cart, product) => {
  return dispatch => {
    if (userId) {
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
        console.log('eh')
        dispatch(receiveCartItems(repackagedTransactions))
      })
    } else {
      let foundProduct = cart.filter(item => item.product_id === product.id)
      let otherProducts = cart.filter(item => item.product_id !== product.id)
      let newCart, updatedProduct

      // if (quantity > product.stock) alert('Quantity exceeds item stock. Please lower quantity!')

      if (foundProduct.length) {
        updatedProduct = Object.assign({}, foundProduct[0])
        updatedProduct.quantity = quantity

        if (+quantity === 0) {
          newCart = otherProducts
          dispatch(receiveCartItems(newCart))
          localStorage.cart = JSON.stringify(newCart)
        } else {
          newCart = otherProducts.concat(updatedProduct)
          dispatch(receiveCartItems(newCart))
          localStorage.cart = JSON.stringify(newCart)
        }
      } else {
        let item = {
          product: product,
          sellingPrice: null,
          quantity: quantity,
          order_id: null,
          product_id: product.id
        }

        newCart = otherProducts.concat(item)
        dispatch(receiveCartItems(newCart))
        localStorage.cart = JSON.stringify(newCart)
      }
    }
  }
}

export const addToCart = (productId, quantity, userId, cart, product) => {
  return dispatch => {
    if (userId) {
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
      })
    } else {
      let foundProduct = cart.filter(item => item.product_id === product.id)
      let otherProducts = cart.filter(item => item.product_id !== product.id)
      let newCart, updatedProduct

      // if (quantity > product.stock) alert('Quantity exceeds item stock. Please lower quantity!')

      if (foundProduct.length) {
        updatedProduct = Object.assign({}, foundProduct[0])
        updatedProduct.quantity = quantity

        if (+quantity === 0) {
          newCart = otherProducts
          dispatch(receiveCartItems(newCart))
          localStorage.cart = JSON.stringify(newCart)
        } else {
          newCart = otherProducts.concat(updatedProduct)
          dispatch(receiveCartItems(newCart))
          localStorage.cart = JSON.stringify(newCart)
        }
      } else {
        let item = {
          product: product,
          sellingPrice: null,
          quantity: quantity,
          order_id: null,
          product_id: product.id
        }

        newCart = otherProducts.concat(item)
        dispatch(receiveCartItems(newCart))
        localStorage.cart = JSON.stringify(newCart)
      }
    }
  }
}

export default reducer
