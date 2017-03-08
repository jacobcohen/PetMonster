import React from 'react'
import {connect} from 'react-redux'

import Sidebar from './Sidebar'
import { ProductButton } from './ProductButton'
import { addToCart } from '../../reducers/cart'

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
  cart: state.orders.cart,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(quantity, userId, cart, product){
    dispatch(addToCart(quantity, userId, cart, product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
