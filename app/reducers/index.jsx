import { combineReducers } from 'redux'
import auth from './auth'
import products from './products'
import users from './users'
import cart from './cart'
import reviews from './reviews'

const rootReducer = combineReducers({
  auth: auth,
  products: products,
  users: users,
  cart: cart,
  reviews: reviews
})

export default rootReducer
