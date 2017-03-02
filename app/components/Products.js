import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'

export const Products = (props) => (
  <div className="row">
    <div className="col-4">
      <ul>
        {props.products && props.products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
          )
        )}
      </ul>
    </div>
  </div>
)

const mapStateToProps = state => ({
  products: state.products.list
})

export default connect(mapStateToProps)(Products)
