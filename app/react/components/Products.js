import React from 'react'
import {connect} from 'react-redux'

import Sidebar from './Sidebar'
import { ProductButton } from './ProductButton'
import { addToCart } from '../../reducers/cart'

export const Products = (props) => (
  <div>

    <Sidebar />

    <div className="col-lg-9 col-sm-12">
        {
          props.products && props.products.map(product => (
            <div key={product.id} className="col-xs-18 col-sm-4 col-md-3">
              <div className="productbox">
                  <ProductButton product={product} handleSubmit={props.addToCart} userId={props.user.id} cart={props.cart} />
              </div>
            </div>
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
  addToCart: function(productId, quantity, userId, cart, product){
    dispatch(addToCart(productId, quantity, userId, cart, product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
