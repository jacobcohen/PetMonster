import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import numeral from 'numeral'
import Sidebar from './Sidebar'
import { ProductButton } from './ProductButton'

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
                  }}>
                <div className="landing-image-overlay">
                  <h4>{product.name}</h4>
                  <p>{ numeral(product.price / 100).format('$0,0.00') }</p>
                </div>
              </div>
            </Link>
            )
          )
        }

        {
          false &&
          <div key={product.id} className="col-xs-18 col-sm-4 col-md-3">
            <div className="productbox">
                <ProductButton product={product} handleSubmit={props.addToCart} userId={props.user.id} cart={props.cart} />
            </div>
          </div>
        }
    </div>

  </div>
  )

const mapStateToProps = state => ({
  products: state.products.list,
  cart: state.orders.cart,
  user: state.auth
})

export default connect(mapStateToProps)(Products)
