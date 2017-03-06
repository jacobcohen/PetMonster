import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Sidebar from './Sidebar'
import axios from 'axios'

import { receiveCartItems } from '../reducers/cart'

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

    <div className="col-lg-9 col-sm-12">
        {props.products && props.products.map(product => (
          <div key={product.id} className="col-xs-18 col-sm-4 col-md-3">
            <div className="productbox">
              <div className="imgthumb img-responsive">
                <img src={product.imageURLs[0]} height="160" width="160" />
              </div>
              <div className="caption">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </div>
              <div className="caption">
                <Link to={`/products/${product.id}`}>${formatPrice(product.price)}</Link>
                <button type="button" className="btn btn-secondary" key={product.id} onClick={() => props.addProdToCart(product, props.user, props.cart)}>+</button>
              </div>
            </div>
          </div>
          )
        )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  products: state.products.list,
  cart: state.cart.list,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  addProdToCart: (product, user, currentCart) => {
    let foundProduct = currentCart.filter(item => item.product_id === product.id)
    let otherProducts = currentCart.filter(item => item.product_id !== product.id)
    let newCart, updatedProduct

    const isLoggedIn = user.email ? true : false
    console.log('FUCK', foundProduct)

    if (foundProduct.length) {
      updatedProduct = foundProduct[0]
      updatedProduct.quantity++
      if (isLoggedIn) {
        return axios.get(`api/orders/cart/${user.id}`)
        .then(res => res.data)
        .then(cart => {
          // console.log(cart)
          if (cart === null) {
            return axios.post(`api/orders/cart/${user.id}`)
            .then(res => res.data)
            .then(newOrder => {
              // console.log(newOrder)
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
            console.log('here')
            return axios.get(`api/transactions/${cart.id}/${product.id}`)
            .then(res => res.data)
            .then(transaction => {
              console.log(transaction.quantity)
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
      // console.log('reached')
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
          // console.log(cart)
          if (cart === null) {
            return axios.post(`api/orders/cart/${user.id}`)
            .then(res => res.data)
            .then(newOrder => {
              // console.log(newOrder)
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
            // console.log('reached')
            return axios.post(`api/transactions/${cart.id}/${product.id}`, {
              sellingPrice: null,
              quantity: 1,
              order_id: cart.id,
              product_id: product.id
            })
            .then(() => {
              // console.log('reached')
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
})

// if logged in
// find order with user id on state (get cart/:userId)
// .then
// post transaction to order using orderId and productId (post /:orderId/:productId)
// OR
// put updated transaction to order using orderId and productId (put /:orderId/:productId)

export default connect(mapStateToProps, mapDispatchToProps)(Products)
