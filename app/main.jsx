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

import { receiveProducts, getProductById } from './reducers/products'
import { receiveUsers } from './reducers/users'

const onAppEnter = () => {

  const pProducts = axios.get('/api/products')
  const pUsers = axios.get('api/users')

  return Promise
    .all([pProducts, pUsers])
    .then(responses => responses.map(r => r.data))
    .then(([products, users]) => {
      store.dispatch(receiveProducts(products))
      store.dispatch(receiveUsers(users))
    })
}

const onProductEnter = (nextRouterState) => {
  const id = nextRouterState.params.productId
  store.dispatch(getProductById(id))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Landing}>
        <IndexRedirect to="/products" />
        <Route path="/products" component={Products} onEnter={onAppEnter} />
        <Route path="/products/:productId" component={Product} onEnter={onProductEnter} />
        <Route path="/users" component={Users} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
