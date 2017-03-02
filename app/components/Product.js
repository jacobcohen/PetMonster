import React from 'react'
import {connect} from 'react-redux'

export const Product = (props) => (
  <div>
    {props.product && props.product.name}
  </div>
)

const mapStateToProps = state => ({
  product: state.products.selected
})

export default connect(mapStateToProps)(Product)
