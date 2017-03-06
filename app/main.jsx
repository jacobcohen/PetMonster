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

import { receiveProducts, getProductById, fetchProductsByCategory } from './reducers/products'
import { receiveUsers } from './reducers/users'
import { receiveCategories, fetchCategory } from './reducers/categories'

const onAppEnter = () => {

  const pProducts = axios.get('/api/products')
  const pCategories = axios.get('/api/categories/all')
  const pUsers = axios.get('api/users')

  return Promise
    .all([pProducts, pCategories, pUsers])
    .then(responses => responses.map(res => res.data))
    .then(([products, categories, users]) => {
      store.dispatch(receiveProducts(products))
      store.dispatch(receiveCategories(categories))
      store.dispatch(receiveUsers(users))
    })
}

const onProductEnter = (nextRouterState) => {
  const id = nextRouterState.params.productId
  store.dispatch(getProductById(id))
}

const onCategoryEnter = (nextRouterState) => {
  const id = nextRouterState.params.categoryId
  store.dispatch(fetchCategory(id))
  store.dispatch(fetchProductsByCategory(id))
}

const onCartEnter = (nextRouterState) => {
  const id = nextRouterState.params.productId
  store.dispatch(getProductById(id))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Landing}>
        <IndexRedirect to="/products" />
        <Route path="/products" component={Products} onEnter={onAppEnter} />
          <Route path="/products/category/:categoryId" component={Products} onEnter={onCategoryEnter} />
        <Route path="/products/:productId" component={Product} onEnter={onProductEnter} />
        <Route path="/cart" component={Cart} />
        <Route path="/users" component={Users} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
