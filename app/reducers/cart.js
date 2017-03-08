import axios from 'axios'

const RECEIVE_CART = 'RECEIVE_CART'
const RECEIVE_ALL_ORDERS = 'RECEIVE_ALL_ORDERS'

const initialCartState = {
  cart: {},
  allOrders: []
}

const reducer = (state = initialCartState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_CART:
      newState.cart = action.cart
      break
    case RECEIVE_ALL_ORDERS:
      newState.allOrders = action.item.concat(newState.list)
      break
    default:
      return state
  }

  return newState
}

export const receiveCart = cart => ({
  type: RECEIVE_CART, cart
})

export const receiveOrders = orders => ({
  type: RECEIVE_ALL_ORDERS, orders
})

// helper functions

function isInDB(localProduct, dbCart) {
  if (!dbCart) return false

  let filtered = dbCart.products.filter(product => product.id === localProduct.id)

  if (filtered.length) {
    return true
  }
  return false
}

function reconcileLocalCartWithDB(localCart, dbCart, userId) {
  if (!localCart.products.length) return axios.get(`/api/orders/cart/${userId}`)

  let onlyLocalProducts = localCart.products.filter(product => !isInDB(product, dbCart))

  let postedTransactions = onlyLocalProducts.map(lP =>
    axios.put(`/api/orders/cart/${userId}/add`, {
      prodId: lP.id,
      quantity: lP.transactions.quantity
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

export const updateCart = (quantity, userId, cart, product) => {
  return dispatch => {
    if (userId) {
      return axios.put(`/api/orders/cart/${userId}/update`, {
        prodId: product.id,
        quantity: quantity
      })
      .then(response => {
        const foundCart = response.data
        dispatch(receiveCart(foundCart))
      })
    } else {
      let foundProduct = cart.products.filter(item => item.id === product.id)
      let otherProducts = cart.products.filter(item => item.id !== product.id)
      let newCart = Object.assign({}, cart),
      updatedProduct

      // if (quantity > product.stock) alert('Quantity exceeds item stock. Please lower quantity!')

      if (foundProduct.length) {
        updatedProduct = Object.assign({}, foundProduct[0])
        updatedProduct.transactions.quantity = quantity
        if (+quantity === 0) {
          newCart.products = otherProducts
          localStorage.cart = JSON.stringify(newCart)
          dispatch(receiveCart(newCart))
        } else {
          newCart.products = otherProducts.concat(updatedProduct)
          localStorage.cart = JSON.stringify(newCart)
          dispatch(receiveCart(newCart))
        }
      } else {
        let item = product
        item.transactions = { quantity: quantity }
        newCart.products = otherProducts.concat(item)
        localStorage.cart = JSON.stringify(newCart)
        dispatch(receiveCart(newCart))
      }
    }
  }
}

export const addToCart = (quantity, userId, cart, product) => {
  return dispatch => {
    if (userId) {
      return axios.put(`/api/orders/cart/${userId}/add`, {
        prodId: product.id,
        quantity: quantity
      })
      .then(response => {
        const foundCart = response.data
        dispatch(receiveCart(foundCart))
      })
    } else {
      let foundProduct = cart.products.filter(item => item.id === product.id)
      let otherProducts = cart.products.filter(item => item.id !== product.id)
      let newCart = Object.assign({}, cart),
      updatedProduct

      // if (quantity > product.stock) alert('Quantity exceeds item stock. Please lower quantity!')

      if (foundProduct.length) {
        updatedProduct = Object.assign({}, foundProduct[0])
        updatedProduct.transactions.quantity = quantity
        if (+quantity === 0) {
          newCart.products = otherProducts
          localStorage.cart = JSON.stringify(newCart)
          dispatch(receiveCart(newCart))
        } else {
          newCart.products = otherProducts.concat(updatedProduct)
          localStorage.cart = JSON.stringify(newCart)
          dispatch(receiveCart(newCart))
        }
      } else {
        let item = product
        item.transactions = { quantity: quantity }
        newCart.products = otherProducts.concat(item)
        localStorage.cart = JSON.stringify(newCart)
        dispatch(receiveCart(newCart))
      }
    }
  }
}

export default reducer
