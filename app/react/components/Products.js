import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import axios from 'axios'

import Sidebar from './Sidebar'
import { ProductButton } from './ProductButton'
import { receiveCartItems, addToCart } from '../../reducers/cart'

// TODO: move this function to the store. It's used in several places.
// There's a native helper function for formatting currency
function formatPrice(price) {
  let dPrice = price / 100
  let sdPrice = '' + dPrice

  if (dPrice > 1000000) {
    sdPrice = sdPrice.slice(0, 1) + ',' + sdPrice.slice(1, 4) + ',' + sdPrice.slice(4)
  } else if (dPrice > 100000) {
    sdPrice = sdPrice.slice(0, 3) + ',' + sdPrice.slice(3)
  } else if (dPrice > 10000) {
    sdPrice = sdPrice.slice(0, 2) + ',' + sdPrice.slice(2)
  } else if (dPrice > 1000) {
    sdPrice = sdPrice.slice(0, 1) + ',' + sdPrice.slice(1)
  }

  if (dPrice % 1 === 0) {
    return sdPrice + '.00'
  } else {
    return sdPrice
  }
}

export const Products = (props) => (
  <div>

    <Sidebar />

    <div className="landing-display col-lg-10">
        {
          props.products && props.products.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div
                  className="landing-image"
                  style={{
                      backgroundImage: `url(${product.imageURLs ? product.imageURLs[0] : ''})`,
                      backgroundPosition: 'center',
                      width: 300,
                      height: 300
                  }}
              />
            </Link>
            )
          )
        }
    </div>
  </div>
)

const mapStateToProps = state => ({
  products: state.products.list,
  cart: state.cart.list,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(productId, quantity, userId){
    dispatch(addToCart(+productId, +quantity, +userId))
  }
/*
  addProdToCart: (product, user, currentCart) => {
    let foundProduct = currentCart.filter(item => item.product_id === product.id)
    let otherProducts = currentCart.filter(item => item.product_id !== product.id)
    let newCart, updatedProduct

    const isLoggedIn = user.email ? true : false

    // TODO:
    // No nested Promise chaining
    // axios calls belong in thunked action creators, not here
    // a lot of this logic is implemented on the back-end


    if (foundProduct.length) {
      updatedProduct = foundProduct[0]
      updatedProduct.quantity++
      if (isLoggedIn) {
        return axios.get(`api/orders/cart/${user.id}`)
        .then(res => res.data)
        .then(cart => {
          if (cart === null) {
            return axios.post(`api/orders/cart/${user.id}`)
            .then(res => res.data)
            .then(newOrder => {
              return axios.post(`api/transactions/${newOrder.id}/${product.id}`, {
                sellingPrice: null,
                quantity: 1,
                order_id: newOrder.id,
                product_id: product.id
              })
              .then(() => {
                newCart = otherProducts.concat([updatedProduct])
                dispatch(receiveCartItems(newCart))
                localStorage.cart = JSON.stringify(newCart)
              })
            })
          } else {
            return axios.get(`api/transactions/${cart.id}/${product.id}`)
            .then(res => res.data)
            .then(transaction => {
              transaction.quantity++
              return axios.put(`api/transactions/${cart.id}/${product.id}`, transaction)
              .then(() => {
                newCart = otherProducts.concat([updatedProduct])
                dispatch(receiveCartItems(newCart))
                localStorage.cart = JSON.stringify(newCart)
              })
            })
          }
        })
      } else {
        newCart = otherProducts.concat([updatedProduct])
        dispatch(receiveCartItems(newCart))
        localStorage.cart = JSON.stringify(newCart)
      }
    } else {
      let item = {
        product: product,
        sellingPrice: null,
        quantity: 1,
        order_id: null,
        product_id: product.id
      }
      if (isLoggedIn) {
        return axios.get(`api/orders/cart/${user.id}`)
        .then(res => res.data)
        .then(cart => {
          if (cart === null) {
            return axios.post(`api/orders/cart/${user.id}`)
            .then(res => res.data)
            .then(newOrder => {
              return axios.post(`api/transactions/${newOrder.id}/${product.id}`, {
                sellingPrice: null,
                quantity: 1,
                order_id: newOrder.id,
                product_id: product.id
              })
              .then(() => {
                newCart = otherProducts.concat([item])
                dispatch(receiveCartItems(newCart))
                localStorage.cart = JSON.stringify(newCart)
              })
            })
          } else {
            return axios.post(`api/transactions/${cart.id}/${product.id}`, {
              sellingPrice: null,
              quantity: 1,
              order_id: cart.id,
              product_id: product.id
            })
            .then(() => {
              newCart = otherProducts.concat([item])
              dispatch(receiveCartItems(newCart))
              localStorage.cart = JSON.stringify(newCart)
            })
          }
        })
      } else {
        newCart = otherProducts.concat([item])
        dispatch(receiveCartItems(newCart))
        localStorage.cart = JSON.stringify(newCart)
      }
    }
  }
  */
})

// if logged in
// find order with user id on state (get cart/:userId)
// .then
// post transaction to order using orderId and productId (post /:orderId/:productId)
// OR
// put updated transaction to order using orderId and productId (put /:orderId/:productId)

export default connect(mapStateToProps, mapDispatchToProps)(Products)
