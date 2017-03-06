import { combineReducers } from 'redux'
import auth from './auth'
import products from './products'
import categories from './categories'
import users from './users'
import cart from './cart'

const rootReducer = combineReducers({
  auth: auth,
  products: products,
  categories: categories,
  users: users,
  cart: cart,
})

export default rootReducer
