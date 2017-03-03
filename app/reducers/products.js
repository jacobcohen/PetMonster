import axios from 'axios'

const RECEIVE_PRODS = 'RECEIVE_PRODS'
const RECEIVE_PROD = 'RECEIVE_PROD'

const fakeProds = [
  {id: 1, name: 'product1', price: 2, imageURLs: ['http://www.illuminessensce.com/wp-content/uploads/2012/12/Image-Coming-Soon-Placeholder.png']},
  {id: 2, name: 'product2', price: 5, imageURLs: ['http://www.illuminessensce.com/wp-content/uploads/2012/12/Image-Coming-Soon-Placeholder.png']}
]

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
    default:
      return state
  }

  return newState
}

export const receiveProducts = products => ({
  type: RECEIVE_PRODS, products
})

export const receiveProduct = product => ({
  type: RECEIVE_PROD, product
})

export const getProductById = id => {
  return dispatch => {
    axios.get(`/api/products/${id}`)
    .then(res => {
      dispatch(receiveProduct(res.data))
    })
  }
}

export default reducer
