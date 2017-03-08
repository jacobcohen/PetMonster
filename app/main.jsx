'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import axios from 'axios'

import store from './store'
import Landing from './react/containers/Landing'
import AdminContainer from './react/containers/AdminContainer'
import Products from './react/components/Products'
import SingleProductContainer from './react/containers/SingleProductContainer'
import Users from './react/components/Users'
import Cart from './react/components/Cart'
import Login from './react/components/Login'

import { receiveProducts, getProductById, fetchProductsByCategory } from './reducers/products'
import { receiveUsers } from './reducers/users'
import { receiveCategories, fetchCategory } from './reducers/categories'
import { receiveCart } from './reducers/cart'
import { getReviewsByProdId, getValidReviewByUserAndProd } from './reducers/reviews'

const onAppEnter = () => {

  const pProducts = axios.get('/api/products')
  const pCategories = axios.get('/api/categories/all')
  const pUsers = axios.get('/api/users')
  // const pOrder = axios.get('api/orders')
  let cart

  if (!localStorage.cart) {
    cart = {
      products: []
    }
    localStorage.cart = JSON.stringify({ products: [] })
  } else {
    cart = JSON.parse(localStorage.cart)
  }

  return Promise
    .all([pProducts, pCategories, pUsers])
    .then(responses => responses.map(res => res.data))
    .then(([products, categories, users]) => {
      store.dispatch(receiveProducts(products))
      store.dispatch(receiveCategories(categories))
      store.dispatch(receiveUsers(users))
      store.dispatch(receiveCart(cart))
    })
}

const onProductEnter = (nextRouterState) => {
  //console.log(store.getState().auth)
  const id = nextRouterState.params.productId
  //const userId = store.getState().auth ? store.getState().auth.id : null
  store.dispatch(getProductById(id))
  store.dispatch(getReviewsByProdId(id))
}

const onCategoryEnter = (nextRouterState) => {
  const id = nextRouterState.params.categoryId
  store.dispatch(fetchCategory(id))
  store.dispatch(fetchProductsByCategory(id))
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
        <Route path="/products" component={Products} onEnter={onAppEnter} />
          <Route path="/products/category/:categoryId" component={Products} onEnter={onCategoryEnter} />
        <Route path="/products/:productId" component={SingleProductContainer} onEnter={onProductEnter} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} onEnter={onCartEnter} />
        <Route path="/users" component={Users} />
        <Route path="/admin" component={AdminContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
