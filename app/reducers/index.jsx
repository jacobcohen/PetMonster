import { combineReducers } from 'redux'
import auth from './auth'
import products from './products'
import categories from './categories'
import users from './users'
import cart from './cart'
import reviews from './reviews'
import modals from './modals'

const rootReducer = combineReducers({
  auth: auth,
  products: products,
  categories: categories,
  users: users,
  cart: cart,
  reviews: reviews,
  modals: modals
})

export default rootReducer
