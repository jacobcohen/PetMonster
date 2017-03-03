import React from 'react'
import {connect} from 'react-redux'

export const Product = (props) => (
  <div className="container" >
    <h3>{props.product && props.product.name}</h3>
    <div className="caption">
      <h4>${props.product && props.product.price}</h4>
      <button type="button" className="btn btn-secondary">+</button>
    </div>
    <hr />
    <p>{props.product && props.product.description}</p>
  </div>
)

const mapStateToProps = state => ({
  product: state.products.selected
})

export default connect(mapStateToProps)(Product)
