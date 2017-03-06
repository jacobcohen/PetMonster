import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Sidebar from './Sidebar'

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
                <Link to={`/products/${product.id}`}>${product.price}</Link>
                <button type="button" className="btn btn-secondary">+</button>
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
})

export default connect(mapStateToProps)(Products)
