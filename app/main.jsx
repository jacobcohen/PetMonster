'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import axios from 'axios'

import store from './store'
import Landing from './components/Landing'
import Products from './components/Products'
import Product from './components/Product'
import Users from './components/Users'
import Cart from './components/Cart'
import Login from './components/Login'

import { receiveProducts, getProductById } from './reducers/products'
import { receiveUsers } from './reducers/users'
import { receiveCartItems } from './reducers/cart'
import { getReviewsByProdId } from './reducers/reviews'


const onAppEnter = () => {

  const pProducts = axios.get('/api/products')
  const pUsers = axios.get('/api/users')
  // const pOrder = axios.get('api/orders')
  let cart

  if (!localStorage.cart) {
    localStorage.cart = JSON.stringify([])
    cart = []
  } else {
    cart = JSON.parse(localStorage.cart)
  }

  return Promise
    .all([pProducts, pUsers])
    .then(responses => responses.map(r => r.data))
    .then(([products, users]) => {
      store.dispatch(receiveProducts(products))
      store.dispatch(receiveUsers(users))
      store.dispatch(receiveCartItems(cart))
    })
}

const onProductEnter = (nextRouterState) => {
  const id = nextRouterState.params.productId
  store.dispatch(getProductById(id))
  store.dispatch(getReviewsByProdId(id))
}

const onCartEnter = (nextRouterState) => {
  // const id = nextRouterState.params.productId
  // store.dispatch(getProductById(id))
  // console.log(nextRouterState.params)


}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Landing} onEnter={onAppEnter} >
        <IndexRedirect to="/products" />
        <Route path="/products" component={Products} />
        <Route path="/products/:productId" component={Product} onEnter={onProductEnter} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} onEnter={onCartEnter} />
        <Route path="/users" component={Users} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
