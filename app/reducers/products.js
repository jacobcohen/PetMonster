import axios from 'axios'

const RECEIVE_PRODS = 'RECEIVE_PRODS'
const RECEIVE_PROD = 'RECEIVE_PROD'
const UPDATE_PROD = 'UPDATE_PROD'

const fakeProds = []

const initialProductsState = {
  selected: {},
  list: fakeProds
}

const reducer = (state = initialProductsState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_PRODS:
      newState.list = action.products
      break
    case RECEIVE_PROD:
      newState.selected = action.product
      break
    case UPDATE_PROD:
      let newProds = []
      state.list.forEach(product => {
        if(product.id === action.product.id)
          newProds.push(action.product)
        else
          newProds.push(product)
      })
      newState.list = newProds
      break
    default:
      return state
  }

  return newState
}

/** Action creators */

export const receiveProducts = products => ({
  type: RECEIVE_PRODS, products
})

export const receiveProduct = product => ({
  type: RECEIVE_PROD, product
})

export const updateStockAndPrice = product => ({
  type: UPDATE_PROD, product
})

/** Thunked action creators */

export const getProductById = id => {
  return dispatch => {
    axios.get(`/api/products/${id}`)
    .then(res => {
      dispatch(receiveProduct(res.data))
    })
  }
}

export const updateProd =(prodId, newStock, newPrice) => {
  return dispatch => {
    axios.put(`/api/products/product/${prodId}/newStock/${newStock}/price/${newPrice}`)
      .then(result => {
        console.log(result)
        dispatch(updateStockAndPrice(result.data))
      })
  }
}


export const fetchProductsByCategory = id => {
  return dispatch => {
    axios.get(`/api/categories/${id}`)
    .then(res => {
      dispatch(receiveProducts(res.data.products))
    })
  }
}

export default reducer
