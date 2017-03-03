import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'

export const Products = (props) => (
  <div>
    <h3>I'm a motherfuckin cart</h3>
  </div>
)

const mapStateToProps = state => ({
  cartItems: state.cart.list
})

export default connect(mapStateToProps)(Products)
